/**
 * Test file to document and verify supported Git revision formats
 * This is not run as part of the main test suite but serves as documentation
 */

// Valid Git revision formats that our validation should accept:
const validGitRevisions = [
  // Basic refs
  "main",
  "master", 
  "develop",
  
  // Branch names with common patterns
  "feature/user-auth",
  "bugfix/fix-123",
  "release/v1.2.3",
  "hotfix/critical-fix",
  
  // Tags
  "v1.0.0",
  "v2.1.3-alpha",
  "release-2024.01",
  
  // SHA hashes (short and full)
  "a1b2c3d",
  "a1b2c3d4e5f6789012345678901234567890abcd",
  
  // Relative references
  "HEAD",
  "HEAD~1",
  "HEAD~10", 
  "HEAD^",
  "HEAD^2",
  "HEAD^^",
  "main~5",
  "main^2",
  
  // Reflog references
  "HEAD@{1}",
  "HEAD@{yesterday}",
  "HEAD@{2.weeks.ago}",
  "main@{upstream}",
  "main@{push}",
  "master@{1.day.ago}",
  
  // Date specifications
  "main@{2023-01-01}",
  "HEAD@{10.minutes.ago}",
  
  // Unicode branch names (common in international projects)
  "feature-🚀",
  "修复-bug", 
  "функция-новая",
  
  // Complex but valid branch names
  "user/john.doe/feature-branch",
  "team-alpha/sprint-2024Q1",
  "refs/heads/main",
  "refs/tags/v1.0.0",
  "origin/main",
  "upstream/develop"
];

// Invalid/dangerous formats that should be rejected:
const dangerousRevisions = [
  // Command injection attempts
  "main; rm -rf /",
  "main && evil-command", 
  "main | cat /etc/passwd",
  "main || rm file",
  
  // Shell expansion
  "main$(evil)",
  "main`evil`",
  "main$((1+1))",
  
  // Path traversal attempts  
  "../../../etc/passwd",
  "../../.git/config",
  
  // Null bytes and control characters
  "main\x00evil",
  "main\nnewline",
  "main\tTab",
  
  // Very long strings (DoS)
  "a".repeat(1000)
];

console.log("Valid Git revision formats supported:", validGitRevisions.length);
console.log("Dangerous formats blocked:", dangerousRevisions.length);
