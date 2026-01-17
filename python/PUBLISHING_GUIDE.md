# 🚀 How to Enable Automatic PyPI Publishing

You have chosen **Automated Publishing**. This means whenever you create a **Release** on GitHub, your package will automatically undergo security checks and be published to PyPI.

## ✅ Prerequisites
1.  A GitHub Account (you have this).
2.  A [PyPI Account](https://pypi.org/account/register/).

---

## 🔗 Step 1: Configure Trusted Publishing (One-Time Setup)

This connects your GitHub repository to PyPI securely without storing hardcoded passwords.

1.  **Log in to PyPI.org**.
2.  Go to **[Publishing](https://pypi.org/manage/account/publishing/)**.
3.  Click **"Add a new pending publisher"**.
4.  Fill in the details:
    *   **PyPI Project Name**: `git-commit-summary`
    *   **Owner**: `otaku0304` (Your GitHub username)
    *   **Repository name**: `git-commit-summary` (Your repo name)
    *   **Workflow name**: `publish.yml`
    *   **Environment name**: Leave blank (or use `pypi` if strictly needed, but blank is fine for simple setups).
5.  Click **"Add"**.

*Note: If this is the VERY FIRST time you are publishing this package name, PyPI might require you to upload it manually once, or create the project placeholder first. If you see an error about the project not existing, create it on PyPI first.*

---

## 🚀 Step 2: Push Your Code

Open your terminal and push the code I have prepared for you:

```bash
git push origin main
```

---

## 🎉 Step 3: Trigger a Release

1.  Go to your GitHub Repository.
2.  Click **"Releases"** (on the right sidebar) -> **"Draft a new release"**.
3.  **Tag version**: `v1.0.0` (Must match setup.py version 1.0.0).
4.  **Title**: "Initial Release".
5.  Click **"Publish release"**.

## 👀 Watch it Happen
1.  Go to the **"Actions"** tab in your repo.
2.  You will see the `Publish to PyPI` workflow running.
3.  Once green, check [PyPI.org](https://pypi.org) — your package is live!
