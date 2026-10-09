// Master list of concept IDs, grouped by track. Every concept file must define
// exactly these IDs, and relatedConceptIds / prerequisiteIds may only point here.
// Order inside a track = suggested learning order.

export const CONCEPT_IDS = {
  internet: [
    'internet', 'web', 'client', 'server', 'browser', 'request', 'response', 'protocol', 'http',
    'https', 'url', 'domain-name', 'ip-address', 'dns', 'port', 'network', 'latency', 'bandwidth',
    'cdn', 'websocket',
  ],
  web: [
    'frontend', 'backend', 'full-stack', 'html', 'css', 'javascript', 'dom', 'rendering', 'event',
    'event-handler', 'state', 'component', 'responsive-design', 'accessibility', 'routing',
    'form-validation', 'client-side-rendering', 'server-side-rendering', 'browser-console',
    'developer-tools',
  ],
  programming: [
    'source-code', 'programming-language', 'syntax', 'variable', 'constant', 'data-type', 'string',
    'number', 'boolean', 'array', 'object', 'function', 'parameter', 'argument', 'return-value',
    'conditional', 'loop', 'iteration', 'scope', 'error', 'exception', 'debugging', 'algorithm',
    'asynchronous-programming', 'promise', 'json', 'library', 'framework',
  ],
  apis: [
    'api', 'api-endpoint', 'http-method', 'http-get', 'http-post', 'http-put', 'http-patch',
    'http-delete', 'request-body', 'response-body', 'status-code', 'headers', 'query-parameter',
    'rest', 'webhook', 'api-key', 'rate-limit', 'sdk', 'integration', 'oauth',
  ],
  data: [
    'database', 'dbms', 'table', 'row', 'column', 'schema', 'sql', 'query', 'primary-key',
    'foreign-key', 'relationship', 'crud', 'index', 'transaction', 'migration', 'sqlite',
    'postgresql', 'nosql', 'cache', 'data-model', 'orm',
  ],
  architecture: [
    'architecture', 'monolith', 'microservices', 'service', 'dependency', 'module', 'abstraction',
    'separation-of-concerns', 'middleware', 'environment-variable', 'configuration',
    'authentication', 'authorization', 'session', 'auth-token', 'encryption', 'hashing',
    'input-sanitization', 'cors', 'dependency-injection',
  ],
  workflow: [
    'version-control', 'git', 'repository', 'commit', 'branch', 'merge', 'pull-request',
    'package-manager', 'build', 'compiler', 'runtime', 'test', 'unit-test', 'integration-test',
    'continuous-integration', 'continuous-deployment', 'deployment', 'hosting', 'environment',
    'logs', 'monitoring', 'observability', 'rollback',
  ],
  ai: [
    'large-language-model', 'llm-token', 'prompt', 'training', 'model-weights', 'inference',
    'context-window', 'hallucination', 'embedding', 'vector-database', 'rag', 'structured-output',
    'tool-calling', 'agent', 'open-source-model', 'local-inference', 'api-inference', 'evaluation',
  ],
} as const;

export const ALL_CONCEPT_IDS: string[] = Object.values(CONCEPT_IDS).flat();
