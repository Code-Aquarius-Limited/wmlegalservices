"""Deployment rules; run with python -m unittest discover -s tests."""
from pathlib import Path
import unittest


ROOT = Path(__file__).resolve().parents[1]
WORKFLOW = ROOT / ".github/workflows/deploy.yml"


def step(workflow, name):
    """Text of one workflow step, from its name to the next step."""
    return workflow.split(f"- name: {name}", 1)[1].split("\n      - ", 1)[0]


class SFTPWorkflowTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.workflow = WORKFLOW.read_text()
        cls.upload = step(cls.workflow, "Upload over SFTP")

    def test_every_push_to_main_deploys(self):
        on = self.workflow.split("\non:", 1)[1].split("\nconcurrency:", 1)[0]
        self.assertIn("push:\n    branches: [main]", on)

    def test_pull_requests_never_upload(self):
        for name in ["Install lftp", "Upload over SFTP"]:
            self.assertIn("if: github.event_name != 'pull_request'", step(self.workflow, name), name)

    def test_deploys_the_static_build(self):
        self.assertIn("run: bun run build:static", step(self.workflow, "Build static site"))
        self.assertIn("dist/client/", self.upload)

    def test_default_sftp_port_is_22(self):
        self.assertIn('port="${SFTP_PORT:-22}"', self.upload)

    def test_host_key_is_checked(self):
        self.assertIn("StrictHostKeyChecking=yes", self.upload)

    def test_dry_run_changes_nothing(self):
        mirrors = [line for line in self.upload.splitlines() if line.strip().startswith("mirror ")]
        self.assertEqual(len(mirrors), 3)
        for line in mirrors:
            self.assertIn("$dry", line)

    def test_only_old_assets_are_deleted(self):
        for line in self.upload.splitlines():
            if "--delete" in line:
                self.assertTrue(line.rstrip().endswith('dist/client/assets/ "$remote/assets/"'), line)

    def test_form_posts_to_lovable_backend(self):
        # The SFTP host can't run the form's backend, so the static build must post to Lovable.
        config = (ROOT / "vite.static.config.ts").read_text()
        self.assertIn("https://wmlegalservices.lovable.app", config)
        self.assertIn("process.env.VITE_ENQUIRY_API_URL = LOVABLE_APP_URL", config)


if __name__ == "__main__":
    unittest.main()
