# Security Policy

## Supported Versions

Currently, the following versions of the project are supported with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take security seriously. If you discover a security vulnerability, please follow these steps:

1.  **Do NOT** open a public issue on GitHub.
2.  Email the vulnerability details to **contact@mraskchay.com**.
3.  Include a detailed description and steps to reproduce the issue.
4.  We will acknowledge your report within 48 hours and provide a timeline for a fix.

## Security Design

This tool is designed with a "Zero-Trust" approach to input:
- **No Execution**: The tool never executes code from the input stream.
- **Memory Safety**: Input is processed via streaming (generators) to prevent Memory Exhaustion (DoS) attacks from large diffs.
- **Sterile Environment**: No external shell commands are invoked based on input content.
- **Dependencies**: Minimal dependencies allow for a smaller attack surface.
