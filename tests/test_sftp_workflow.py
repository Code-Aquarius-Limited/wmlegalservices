"""Deployment rules; run with python -m unittest discover -s tests."""
import ast
from pathlib import Path
import unittest


WORKFLOW = Path(__file__).resolve().parents[1] / ".github/workflows/build.yml"


class SFTPWorkflowTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.workflow = WORKFLOW.read_text()
        script = cls.workflow.split("python <<'PY'\n", 1)[1].rsplit("          PY", 1)[0]
        cls.script = "\n".join(line[10:] for line in script.splitlines())
        cls.tree = ast.parse(cls.script)

    def test_default_sftp_port_is_22(self):
        calls = [node for node in ast.walk(self.tree)
                 if isinstance(node, ast.Call) and isinstance(node.func, ast.Attribute)
                 and node.func.attr == "connect"]
        self.assertEqual(len(calls), 1)
        port = next(keyword.value for keyword in calls[0].keywords if keyword.arg == "port")
        self.assertEqual(ast.literal_eval(port), 22)

    def test_pull_requests_never_upload(self):
        step = self.workflow.split("- name: Upload build via SFTP", 1)[1]
        self.assertIn("if: github.event_name != 'pull_request'", step.split("env:", 1)[0])

    def test_unknown_host_keys_are_rejected(self):
        calls = [node for node in ast.walk(self.tree)
                 if isinstance(node, ast.Call) and isinstance(node.func, ast.Attribute)
                 and node.func.attr == "set_missing_host_key_policy"]
        self.assertEqual(len(calls), 1)
        self.assertEqual(calls[0].args[0].func.attr, "RejectPolicy")


if __name__ == "__main__":
    unittest.main()