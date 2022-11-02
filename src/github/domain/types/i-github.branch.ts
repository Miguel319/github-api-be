export interface IGitHubBranch {
  name: string;
  commit: {
    sha: string;
    url: string;
  };
  protected: boolean;
  protection: {
    enabled: boolean;
    required_status_checks: {
      enforcement_level: string;
      contexts: unknown[];
      checks: unknown[];
    };
  };
  protection_url: string;
}
