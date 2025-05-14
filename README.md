# Zod URL Validation Issues

This repository demonstrates current issues with Zod 4's `z.url()` validation. Below are the test results and analysis of the current behavior.

## Test Results

```
Test Suites: 1 failed, 1 total
Tests:       5 failed, 11 passed, 16 total
```

## What Works ✅

1. Regular domain URLs:
   - Basic domains (e.g., "https://example.com")
   - Domains with www (e.g., "https://www.example.com")
   - Domains with paths (e.g., "https://example.com/path")
   - URLs with query parameters (e.g., "https://example.com?foo=bar")
   - URLs with hash fragments (e.g., "https://example.com#section")

2. Protocol Support:
   - HTTP/HTTPS protocols
   - FTP protocol (e.g., "ftp://example.com")

3. Edge Cases:
   - IP addresses (e.g., "http://127.0.0.1")
   - URLs with basic auth (e.g., "https://user:pass@example.com")
   - Multiple subdomains (e.g., "https://api.staging.example.com")

4. Basic Validation:
   - Rejects strings without protocol
   - Rejects malformed URLs

## What's Broken ❌

1. Localhost URLs (All Failing):
   ```
   ✕ should validate basic localhost
   ✕ should validate localhost with port
   ✕ should validate localhost with path
   ✕ should validate localhost with https
   ```
   This is a critical issue as localhost URLs are commonly used in development environments.

2. Character Encoding:
   ```
   ✕ should reject URLs with spaces
   ```
   The validator is accepting URLs with unencoded spaces, which should be rejected according to URL standards.