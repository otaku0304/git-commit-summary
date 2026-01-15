import sys
import re

def read_input():
    if sys.stdin.isatty():
        print("❌ Please pipe a git diff or commit.")
        sys.exit(1)
    return sys.stdin.read()

def summarize(diff_text):
    files = set()
    added = removed = 0
    functions_added = []

    for line in diff_text.splitlines():
        if line.startswith("diff --git"):
            files.add(line.split(" ")[2].replace("a/", ""))

        if line.startswith("+") and not line.startswith("+++"):
            added += 1
            match = re.match(r"\+\s*def\s+(\w+)", line)
            if match:
                functions_added.append(match.group(1))

        if line.startswith("-") and not line.startswith("---"):
            removed += 1

    return {
        "files": len(files),
        "added": added,
        "removed": removed,
        "functions_added": functions_added
    }

if __name__ == "__main__":
    diff = read_input()
    result = summarize(diff)

    print("\n📊 Git Commit Summary")
    print("--------------------")
    print(f"Files changed : {result['files']}")
    print(f"Lines added   : {result['added']}")
    print(f"Lines removed : {result['removed']}")

    if result["functions_added"]:
        print("Functions added:")
        for fn in result["functions_added"]:
            print(f"  + {fn}")
    else:
        print("Functions added: none")
