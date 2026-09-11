import { CategoryGroupType, Difficulty } from "@/generated/prisma/enums";

/**
 * 3 groups, 19 categories, 570 original interview questions.
 * Every category contains 10 EASY, 10 MEDIUM, and 10 HARD questions.
 * Junior-role HARD questions target troubleshooting and escalation, not senior ownership.
 * This is interview practice content, not a claim that an employer asked these questions.
 *
 * INTEGRATION:
 * The supplied sample exposes only CategoryGroupType.LANGUAGE. The other enum
 * members and your database schema were not supplied, so no members are guessed.
 * Call createCategoryGroups({ careers: <your valid enum member>,
 *                            foundations: <your valid enum member> });
 * Bind its return value to categoryGroups in your existing seed entry point.
 * The returned nested objects preserve the original sample's field structure.
 * Existing React/Next.js/TypeScript/Node.js demo categories are not included in
 * this requested replacement dataset. This file performs no database writes.
 */
export type CategoryGroupTypes = {
  careers: CategoryGroupType;
  foundations: CategoryGroupType;
};

export const createCategoryGroups = (types: CategoryGroupTypes) => [

  {
    name: "IT Careers Positions",
    slug: "it-careers-positions",
    type: types.careers,
    description: "Practical role-based interview preparation, including junior infrastructure and AI roles.",
    icon: "Briefcase",
    color: "#0D9488",
    order: 1,
    isActive: true,
    categories: [
      {
        name: "Frontend Developer",
        description: "Frontend Developer interview questions covering fundamentals, applied implementation, and troubleshooting.",
        sortOrder: 1,
        questions: [
          // EASY (10)
          {
            question: "How do semantic HTML elements improve an interview application's accessibility?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "When would you use Flexbox rather than CSS Grid for a page layout?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "How would you make a navigation menu usable on a small screen?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "What is the difference between component props and local state?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "How would you connect an input field to form state?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "What should a page display while an API request is loading?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "How do you associate a visible label with a form input?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "What is the purpose of the browser's developer tools Network panel?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "Why do rendered lists need stable item identifiers?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "How would you show a useful message when a form field is invalid?",
            difficulty: Difficulty.EASY,
          },
          // MEDIUM (10)
          {
            question: "How would you debounce search input without delaying normal typing?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you prevent an older search response from replacing newer results?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you implement an accessible modal with keyboard focus management?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you decide whether a filter belongs in local state or the URL?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you diagnose a layout that overflows only on mobile devices?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you manage server data separately from temporary UI state?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you implement optimistic bookmarking and handle a failed request?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you investigate an image-heavy page that loads slowly?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you test a question form's loading, success, and error states?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you keep pagination and filters consistent when navigating back?",
            difficulty: Difficulty.MEDIUM,
          },
          // HARD (10)
          {
            question: "A production page becomes unresponsive with 20000 rows; how would you profile and improve it?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you investigate hydration mismatches without hiding the underlying error?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you design offline draft editing and resolve conflicting server updates?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you prevent sensitive data from appearing in browser storage or logs?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you migrate a shared component without breaking dozens of consuming pages?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you distinguish network latency from rendering cost in a slow dashboard?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you design a resilient multi-step form that survives refreshes and partial failures?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you support screen readers and keyboard navigation in a virtualized list?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you evaluate whether code splitting actually improves the user experience?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you design a frontend permission model while keeping authorization enforced on the server?",
            difficulty: Difficulty.HARD,
          },
        ],
      },
      {
        name: "Backend Developer",
        description: "Backend Developer interview questions covering fundamentals, applied implementation, and troubleshooting.",
        sortOrder: 2,
        questions: [
          // EASY (10)
          {
            question: "How do GET, POST, PUT, PATCH, and DELETE differ in an HTTP API?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "What is the difference between authentication and authorization?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "Why must an API validate data even when the frontend already validates it?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "When should an API return 400, 401, 403, or 404?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "How would you store user passwords safely?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "What does a database transaction protect?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "Why should API secrets be kept out of source control?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "What information makes a server error log useful?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "Why is pagination useful for an endpoint returning interview questions?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "What is the purpose of a database foreign key?",
            difficulty: Difficulty.EASY,
          },
          // MEDIUM (10)
          {
            question: "How would you prevent a user from editing another user's question?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you design filtering and pagination for a growing question bank?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you make a create endpoint safe to retry?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you detect and fix an N+1 query problem?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you structure validation errors so clients can display them clearly?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you implement rate limiting behind a reverse proxy?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you expire and invalidate cached category data?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you process email notifications outside the request lifecycle?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you migrate a required database column without breaking existing requests?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you implement audit logging without recording passwords or tokens?",
            difficulty: Difficulty.MEDIUM,
          },
          // HARD (10)
          {
            question: "Two requests attempt to reserve the final available seat; how would you prevent overselling?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you handle a payment provider timeout when the charge may have succeeded?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you make database writes and event publication reliable together?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you diagnose rising tail latency when average latency looks normal?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you design tenant isolation and test for cross-tenant access?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you handle duplicate and out-of-order webhook deliveries?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you roll out an incompatible API change while old clients remain active?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you recover from a background worker repeatedly processing a poisonous message?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you investigate a connection pool exhausted under moderate traffic?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you design deletion across the database, cache, search index, and file storage?",
            difficulty: Difficulty.HARD,
          },
        ],
      },
      {
        name: "Full Stack Developer",
        description: "Full Stack Developer interview questions covering fundamentals, applied implementation, and troubleshooting.",
        sortOrder: 3,
        questions: [
          // EASY (10)
          {
            question: "Describe the request path from clicking Submit to saving a record in a database.",
            difficulty: Difficulty.EASY,
          },
          {
            question: "Which validation checks belong on the client and which belong on the server?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "How does a frontend consume JSON from a backend endpoint?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "Why should the browser never connect using privileged database credentials?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "How would you display server validation errors beside form fields?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "What is the purpose of a session cookie in a login flow?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "How would you separate development configuration from production configuration?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "What happens when a frontend request receives an HTTP 500 response?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "How would you represent a category and its questions in a relational database?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "What basic checks would you perform before deploying a CRUD feature?",
            difficulty: Difficulty.EASY,
          },
          // MEDIUM (10)
          {
            question: "How would you implement search filters that persist in the URL and drive API queries?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you coordinate frontend and backend changes for a renamed response field?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you implement secure file uploads and display their processing status?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you keep a dashboard consistent after creating or deleting a record?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you test a login-to-bookmark flow across the browser and API?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you implement role-based navigation without relying on it for security?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you trace a failed form submission across browser logs and server logs?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you avoid duplicate submissions when users click a button repeatedly?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you design a preview screen for a multi-step publishing workflow?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you choose server rendering or client rendering for a question detail page?",
            difficulty: Difficulty.MEDIUM,
          },
          // HARD (10)
          {
            question: "How would you investigate a feature that works locally but fails only behind the production proxy?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you design resumable uploads with authorization and duplicate prevention?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you deploy a schema change and UI change with zero avoidable downtime?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you implement collaborative editing with conflict handling and durable saves?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you prevent cached pages from leaking one user's private data to another?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you design an import workflow with validation, progress reporting, and partial failures?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you identify the bottleneck when a page is slow across database, API, and rendering layers?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you implement account deletion while keeping permitted audit records separate?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you roll back a release after it has already written data in a new format?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you design reliable assessment submission during intermittent network connectivity?",
            difficulty: Difficulty.HARD,
          },
        ],
      },
      {
        name: "Junior Cloud Engineer",
        description: "Junior Cloud Engineer interview questions covering fundamentals, applied implementation, and troubleshooting.",
        sortOrder: 4,
        questions: [
          // EASY (10)
          {
            question: "How do virtual machines, containers, and serverless functions differ?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "What is the difference between object storage and block storage?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "What is a cloud region and what is an availability zone?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "Why is least-privilege access important for a cloud account?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "What is the purpose of a virtual private network segment in a cloud environment?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "How does a load balancer help a web application?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "Why should a database usually avoid direct public internet access?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "What is the difference between a backup and a running replica?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "What would you monitor for a small cloud-hosted application?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "How can resource tags help a team track cloud costs?",
            difficulty: Difficulty.EASY,
          },
          // MEDIUM (10)
          {
            question: "How would you grant an application access to object storage without embedding long-lived keys?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you troubleshoot a virtual machine that cannot reach the internet?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you expose a web service while keeping its database private?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you set up a budget alert and investigate an unexpected cost increase?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you verify that a scheduled backup can actually be restored?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you choose health check settings for a load-balanced service?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you distinguish a security group problem from an application port problem?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you configure storage lifecycle rules for old application exports?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you use infrastructure as code to reproduce a test environment?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you collect application logs centrally without exposing sensitive fields?",
            difficulty: Difficulty.MEDIUM,
          },
          // HARD (10)
          {
            question: "A deployment is healthy in one zone but failing in another; how would you investigate and escalate?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "A public storage bucket contains private uploads; how would you contain exposure and preserve evidence?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you plan a restore exercise against a four-hour recovery target?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you investigate traffic charges that increased after a multi-zone rollout?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you rotate an exposed application credential with minimal service disruption?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you troubleshoot a load balancer returning errors when instances appear healthy?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you assess the risks of applying an infrastructure plan that replaces a database?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you recover access when a firewall change locks out administrators?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you investigate a serverless function that times out only during traffic bursts?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you explain the availability and cost trade-offs of adding a second zone?",
            difficulty: Difficulty.HARD,
          },
        ],
      },
      {
        name: "Junior DevOps Engineer",
        description: "Junior DevOps Engineer interview questions covering fundamentals, applied implementation, and troubleshooting.",
        sortOrder: 5,
        questions: [
          // EASY (10)
          {
            question: "What is the difference between continuous integration and continuous delivery?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "What stages would you include in a simple application pipeline?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "How does a container image differ from a running container?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "Why should builds use pinned dependency versions or lockfiles?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "What is the purpose of a readiness check?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "Why must pipeline secrets not be printed in logs?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "How does a Git pull request support safe deployment?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "What is an artifact and why should a deployment reuse a tested artifact?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "What does infrastructure as code help a team automate?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "What should a basic deployment rollback procedure contain?",
            difficulty: Difficulty.EASY,
          },
          // MEDIUM (10)
          {
            question: "How would you investigate a pipeline that passes locally but fails in CI?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you reduce a container image's size without removing required runtime files?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you inject configuration into a container without rebuilding the image?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you handle database migrations in a deployment pipeline?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you prevent two pipelines from deploying concurrently to production?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you configure a service to shut down gracefully during replacement?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you separate liveness checks from readiness checks?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you cache dependencies safely in CI?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you deploy a tested image to staging and then promote it to production?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you alert on user-facing failures instead of every transient container restart?",
            difficulty: Difficulty.MEDIUM,
          },
          // HARD (10)
          {
            question: "A release causes errors only for some users; how would you investigate and decide whether to roll back?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you respond if a build dependency was reported compromised?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you diagnose containers repeatedly restarting after a configuration change?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you introduce a canary deployment and define stop conditions?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you recover when a deployment succeeds but its database migration partially fails?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you investigate why adding replicas does not improve application throughput?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you prevent an untrusted pull request from accessing production secrets?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you verify a backup before relying on it during an incident?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you restore a pipeline after its deployment credentials expire?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you document a production incident so the next on-call engineer can act faster?",
            difficulty: Difficulty.HARD,
          },
        ],
      },
      {
        name: "Junior System Engineer",
        description: "Junior System Engineer interview questions covering fundamentals, applied implementation, and troubleshooting.",
        sortOrder: 6,
        questions: [
          // EASY (10)
          {
            question: "What is the difference between a process and a service?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "How would you inspect CPU, memory, and disk usage on a Linux server?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "What do file read, write, and execute permissions mean?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "What is the purpose of SSH key authentication?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "How do DNS and IP addresses work together?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "What is the difference between a listening port and an established connection?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "Why should routine administration avoid using the root account directly?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "What information would you look for in system logs?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "How does a scheduled task differ from a continuously running service?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "Why is a tested restore procedure part of a backup plan?",
            difficulty: Difficulty.EASY,
          },
          // MEDIUM (10)
          {
            question: "How would you troubleshoot a service that fails to start after reboot?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you investigate a disk that is almost full?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you determine whether a connectivity failure is DNS-related?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you safely grant a service account access to one application directory?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you schedule security updates while limiting disruption?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you investigate a server that is slow despite low CPU utilization?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you configure log rotation and verify that it works?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you troubleshoot an SSH login failure without disabling security controls?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you check whether a TLS certificate is expired or incorrectly installed?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you verify a restored server's application and network configuration?",
            difficulty: Difficulty.MEDIUM,
          },
          // HARD (10)
          {
            question: "Disk space remains exhausted after deleting large logs; how would you investigate open file handles?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you investigate a machine that intermittently loses network access after a DHCP renewal?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you contain a suspected compromised account and escalate the incident?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you recover a critical service after an incorrect permission change?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you distinguish memory pressure, a memory leak, and filesystem cache usage?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you plan a server migration with a rollback point and verified data integrity?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you investigate clock drift that causes authentication failures?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you troubleshoot an application blocked by a mandatory access control policy?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you recover from a failed patch when remote access is unavailable?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you prioritize recovery when storage, authentication, and application services fail together?",
            difficulty: Difficulty.HARD,
          },
        ],
      },
      {
        name: "Junior AI Engineer",
        description: "Junior AI Engineer interview questions covering fundamentals, applied implementation, and troubleshooting.",
        sortOrder: 7,
        questions: [
          // EASY (10)
          {
            question: "What is the difference between supervised and unsupervised learning?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "Why do we separate training, validation, and test data?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "What is overfitting and how might it appear in evaluation results?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "How do classification and regression problems differ?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "What does a confusion matrix show?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "Why should missing values be handled consistently during training and inference?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "What is an embedding and when might an application use one?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "How does model inference differ from model training?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "Why can an AI-generated answer sound confident but still be wrong?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "What is the purpose of a baseline model?",
            difficulty: Difficulty.EASY,
          },
          // MEDIUM (10)
          {
            question: "How would you choose evaluation metrics for an imbalanced classification dataset?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you detect data leakage before trusting a model's score?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you ensure preprocessing uses only information from the training split?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you compare two prompts using a fixed evaluation dataset?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you build a small retrieval-augmented question-answering prototype?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you measure retrieval quality separately from answer quality?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you package a model with its preprocessing steps for an API?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you track datasets, model versions, and experiment results?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you inspect false positives and false negatives to guide improvements?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you estimate inference cost and latency for a classroom demo?",
            difficulty: Difficulty.MEDIUM,
          },
          // HARD (10)
          {
            question: "A model performs well offline but poorly on recent inputs; how would you investigate?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you prevent private documents from being retrieved for an unauthorized user?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you test a retrieval application against instructions hidden inside documents?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you design a human review path for low-confidence predictions?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you compare a cheaper model with a larger model using quality, latency, and cost?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you evaluate an interview-answer feedback system without relying only on another model's score?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you diagnose whether poor answers come from missing documents, retrieval, or generation?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you process duplicate or conflicting source documents in a retrieval pipeline?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you make an inference service degrade gracefully when its model provider is unavailable?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you explain the limits of a prototype whose test set contains only fifty examples?",
            difficulty: Difficulty.HARD,
          },
        ],
      },
    ],
  },
  {
    name: "Programming",
    slug: "programming",
    type: CategoryGroupType.LANGUAGE,
    description: "Language and platform interview preparation; .NET focuses on C# and ASP.NET Core.",
    icon: "Code2",
    color: "#2563EB",
    order: 2,
    isActive: true,
    categories: [
      {
        name: "Java",
        description: "Java interview questions covering fundamentals, applied implementation, and troubleshooting.",
        sortOrder: 1,
        questions: [
          // EASY (10)
          {
            question: "How do the JDK, JVM, and Java bytecode relate to each other?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "What is the difference between a primitive value and an object reference in Java?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "How do == and equals differ when comparing Java strings?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "How would you choose between an array and an ArrayList?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "What do public, protected, and private control in Java?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "How does a constructor differ from an ordinary method?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "What is the difference between method overloading and overriding?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "How do interfaces and abstract classes differ?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "What happens when an exception is not handled by the calling code?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "Why is String immutable and how does that affect concatenation?",
            difficulty: Difficulty.EASY,
          },
          // MEDIUM (10)
          {
            question: "What contract must equals and hashCode satisfy for a HashMap key?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you use try-with-resources to close a file safely?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How do checked and unchecked exceptions influence API design?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you use generics to implement a type-safe repository interface?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "When would you use a stream pipeline instead of a loop?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you avoid shared mutable state when processing requests concurrently?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How do synchronized and volatile address different concurrency concerns?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you combine independent asynchronous operations with CompletableFuture?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you handle absent results without misusing Optional?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you test code that depends on the current time?",
            difficulty: Difficulty.MEDIUM,
          },
          // HARD (10)
          {
            question: "A HashMap entry becomes unreachable after its key changes; explain the cause and redesign the key.",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you diagnose increasing heap usage in a long-running Java service?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you identify and fix a deadlock using a thread dump?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you design cancellation and timeouts across several CompletableFuture operations?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you choose a bounded executor configuration for a slow downstream service?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you explain happens-before relationships in a safely published shared object?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you investigate high garbage collection time before changing JVM settings?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you design a generic API using bounded wildcards without unsafe casts?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you make a Java library binary-compatible while evolving its public API?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you benchmark two Java implementations while accounting for warm-up and dead-code elimination?",
            difficulty: Difficulty.HARD,
          },
        ],
      },
      {
        name: "C++",
        description: "C++ interview questions covering fundamentals, applied implementation, and troubleshooting.",
        sortOrder: 2,
        questions: [
          // EASY (10)
          {
            question: "What is the difference between a pointer and a reference in C++?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "How do stack storage and dynamically allocated storage differ in lifetime?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "What does const communicate about a variable or parameter?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "How would you choose between std::string and a character array?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "What is a constructor and when does a destructor run?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "Why is std::vector often safer than managing a raw dynamic array?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "How do pass-by-value and pass-by-reference differ?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "What is the purpose of a header file and an include guard?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "How do public and private members support encapsulation?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "Why must dynamically allocated resources be released correctly?",
            difficulty: Difficulty.EASY,
          },
          // MEDIUM (10)
          {
            question: "How does RAII make resource management exception-safe?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "When would you choose std::unique_ptr rather than std::shared_ptr?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "What are copy construction and copy assignment used for?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How do move construction and move assignment avoid unnecessary resource copying?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "When can std::vector operations invalidate iterators and references?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "Why should a polymorphic base class often have a virtual destructor?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you use a template to write a reusable maximum function?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "What are basic, strong, and no-throw exception guarantees?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you prevent object slicing when storing derived objects?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you choose between std::map and std::unordered_map for a lookup workload?",
            difficulty: Difficulty.MEDIUM,
          },
          // HARD (10)
          {
            question: "How would you diagnose a use-after-free bug that appears only in optimized builds?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you implement a resource-owning class while following the rule of five?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you break a std::shared_ptr ownership cycle without creating dangling access?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you explain undefined behavior using a data race example?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you design a thread-safe queue with shutdown and exception handling?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you reduce allocations in a hot path without making ownership unclear?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you investigate why a noexcept move constructor changes vector reallocation behavior?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you design an API that returns a view without allowing it to outlive its data?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you compare lock-based and lock-free approaches before choosing one?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you preserve exception safety when updating multiple related containers?",
            difficulty: Difficulty.HARD,
          },
        ],
      },
      {
        name: ".NET",
        description: ".NET interview questions covering fundamentals, applied implementation, and troubleshooting.",
        sortOrder: 3,
        questions: [
          // EASY (10)
          {
            question: "How do .NET, the CLR, and C# relate to each other?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "What is the difference between a value type and a reference type in C#?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "How do properties differ from fields in a C# class?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "What does an interface define in a .NET application?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "How would you handle an exception with try, catch, and finally?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "What is the purpose of a using statement for disposable resources?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "How does List<T> differ from an array?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "What does dependency injection help separate in an application?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "What does an ASP.NET Core endpoint return to an HTTP client?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "Why should connection strings not be committed to source control?",
            difficulty: Difficulty.EASY,
          },
          // MEDIUM (10)
          {
            question: "How do singleton, scoped, and transient service lifetimes differ?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you use async and await for a database-backed endpoint?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How do IEnumerable<T> and IQueryable<T> differ in query execution?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you detect an Entity Framework Core N+1 query problem?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "Why does middleware ordering matter in an ASP.NET Core request pipeline?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you validate an incoming request and return field-level errors?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you pass a CancellationToken through an asynchronous operation?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you use configuration options without scattering environment reads throughout the code?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you test an endpoint while replacing an external email service?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you handle optimistic concurrency conflicts when updating an EF Core entity?",
            difficulty: Difficulty.MEDIUM,
          },
          // HARD (10)
          {
            question: "A singleton service captures a scoped database context; what failures can result and how would you fix it?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you diagnose thread-pool starvation in an ASP.NET Core application?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you coordinate a database transaction and reliable background event delivery?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you investigate memory growth caused by long-lived event subscriptions?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you implement an idempotent request handler with concurrent duplicate requests?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you stream a large response without buffering the entire result in memory?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you design a background service with graceful shutdown and bounded work?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you roll out an EF Core schema migration while older application instances remain active?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you distinguish cancellation, timeout, and application failure in an API's telemetry?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you investigate poor query performance caused by materializing IQueryable too early?",
            difficulty: Difficulty.HARD,
          },
        ],
      },
      {
        name: "PHP",
        description: "PHP interview questions covering fundamentals, applied implementation, and troubleshooting.",
        sortOrder: 4,
        questions: [
          // EASY (10)
          {
            question: "How are variables declared and used in PHP?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "What is the difference between == and === in PHP?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "How do indexed and associative arrays differ?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "How would you read submitted form data without assuming every field exists?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "What are include and require used for?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "How does a PHP class define properties and methods?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "What is the purpose of Composer in a PHP project?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "How do cookies and server-side sessions differ?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "Why should user input not be concatenated into an SQL query?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "How would you return a JSON response from PHP?",
            difficulty: Difficulty.EASY,
          },
          // MEDIUM (10)
          {
            question: "How do parameter and return type declarations improve a PHP function?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you use PDO prepared statements for a search endpoint?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you hash and verify a password using PHP's password functions?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you validate and store an uploaded file safely?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you organize dependencies with Composer autoloading?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "When would you use a trait instead of inheritance?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you handle exceptions without exposing stack traces to users?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you secure a session after a successful login?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you write a generator to process a large input incrementally?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you prevent CSRF in a cookie-authenticated PHP form?",
            difficulty: Difficulty.MEDIUM,
          },
          // HARD (10)
          {
            question: "A PHP application slows down when concurrent requests share a session; how would you investigate session locking?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you debug memory growth in a long-running PHP queue worker?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you prevent unsafe object deserialization in an application boundary?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you design retry-safe background jobs that update a database and send email?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you profile whether slow requests are caused by PHP execution, SQL, or external calls?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you deploy a backward-compatible database change across multiple PHP instances?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you prevent race conditions in a PHP inventory update endpoint?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you handle partial failures while importing a large CSV without exhausting memory?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you investigate stale code after deployment in a process using an opcode cache?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you evolve an API from loose input types to strict validation without breaking clients unexpectedly?",
            difficulty: Difficulty.HARD,
          },
        ],
      },
      {
        name: "Golang",
        description: "Golang interview questions covering fundamentals, applied implementation, and troubleshooting.",
        sortOrder: 5,
        questions: [
          // EASY (10)
          {
            question: "How do you declare variables and constants in Go?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "How does a slice differ from an array?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "What are the zero values of common Go types?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "How does a struct group related data?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "What is the purpose of a pointer parameter in Go?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "How does a function return both a result and an error?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "What does defer do and when are deferred calls executed?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "How do exported and unexported identifiers differ?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "What is a goroutine?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "What are Go modules used for?",
            difficulty: Difficulty.EASY,
          },
          // MEDIUM (10)
          {
            question: "How do slices share backing arrays and why can append affect that relationship?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How does a type satisfy an interface in Go?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you wrap an error while preserving checks with errors.Is?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you use context cancellation in an HTTP handler?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "When would you choose a buffered channel instead of an unbuffered channel?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you coordinate goroutine completion without using arbitrary sleeps?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you protect a map shared by multiple goroutines?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you implement a table-driven test for request validation?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you avoid leaking an HTTP response body?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you distinguish a nil interface from an interface holding a typed nil pointer?",
            difficulty: Difficulty.MEDIUM,
          },
          // HARD (10)
          {
            question: "How would you find and fix a goroutine leak in a service that calls a slow dependency?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you build a bounded worker pool with cancellation and error propagation?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you design ownership rules for closing channels in a multi-producer pipeline?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you investigate a data race that does not reproduce in ordinary unit tests?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you implement graceful shutdown while allowing in-flight requests to complete?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you diagnose excess allocations using benchmarks and profiling?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you prevent unbounded memory growth when producers outpace consumers?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you design retries with deadlines, jitter, and idempotency in a Go client?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you analyze a deadlock caused by mixed mutex and channel synchronization?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you define a small interface boundary that enables testing without overabstracting the application?",
            difficulty: Difficulty.HARD,
          },
        ],
      },
      {
        name: "JavaScript",
        description: "JavaScript interview questions covering fundamentals, applied implementation, and troubleshooting.",
        sortOrder: 6,
        questions: [
          // EASY (10)
          {
            question: "How do let, const, and var differ in scope and reassignment?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "What is the difference between null and undefined?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "How do === and == compare values differently?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "How would you add, remove, and find items in an array?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "How do function declarations and arrow functions differ in basic usage?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "What is an object and how do you access its properties?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "What does JSON.stringify do and how is it paired with JSON.parse?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "How do map, filter, and forEach differ in their return values?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "What is the difference between a truthy value and a boolean true?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "How would you catch an error thrown by synchronous JavaScript code?",
            difficulty: Difficulty.EASY,
          },
          // MEDIUM (10)
          {
            question: "How does a closure retain access to variables from its lexical scope?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How do promises represent asynchronous success and failure?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you use async and await while preserving error handling?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How does this behave differently in an arrow function and a regular method?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "What is the temporal dead zone for let and const?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How does event delegation reduce the number of DOM event listeners?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How do shallow copies differ from deep copies for nested objects?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you run independent asynchronous requests concurrently?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you implement a debounce function that preserves arguments?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How does prototypal inheritance resolve a property lookup?",
            difficulty: Difficulty.MEDIUM,
          },
          // HARD (10)
          {
            question: "In a browser, explain the output order of synchronous logs, Promise callbacks, and setTimeout callbacks.",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you implement a concurrency-limited asynchronous task runner with failure handling?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you implement Promise.all-like behavior while preserving input order and rejecting on failure?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you identify a memory leak caused by detached DOM elements and event listeners?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you implement a cancellable search flow using AbortController and guard against stale results?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you design a deep clone operation and state which value types it supports?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you prevent repeated microtask scheduling from starving browser rendering?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you implement a memoization strategy that does not retain unbounded keys forever?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you reason about getter side effects when copying or serializing an object?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you safely process untrusted object keys without allowing prototype pollution?",
            difficulty: Difficulty.HARD,
          },
        ],
      },
    ],
  },
  {
    name: "Software Engineering Foundations",
    slug: "software-engineering-foundations",
    type: types.foundations,
    description: "Core engineering knowledge for technical interviews and real application work.",
    icon: "Layers",
    color: "#7C3AED",
    order: 3,
    isActive: true,
    categories: [
      {
        name: "Data Structures & Algorithms",
        description: "Data Structures & Algorithms interview questions covering fundamentals, applied implementation, and troubleshooting.",
        sortOrder: 1,
        questions: [
          // EASY (10)
          {
            question: "How do arrays and linked lists differ in accessing an item by index?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "What does a stack do and where might an application use one?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "What does a queue do and how does it differ from a stack?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "How does a hash table support key-based lookup?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "What does Big O notation describe?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "How would you find the largest value in an unsorted list?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "How would you detect whether a string is a palindrome?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "What condition must hold before using binary search on an array?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "What are nodes and edges in a graph?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "How does recursion use a base case to stop?",
            difficulty: Difficulty.EASY,
          },
          // MEDIUM (10)
          {
            question: "How would you find two numbers that sum to a target using a hash map?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you detect a cycle in a linked list without storing every visited node?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you merge two sorted arrays and analyze time and space complexity?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you find the first non-repeating character in a string?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you use breadth-first search to find a shortest path in an unweighted graph?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you validate nested brackets using a stack?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you implement binary search without off-by-one errors?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you maintain the largest ten values in a stream using a heap?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you solve a longest-substring-without-repeats problem using a sliding window?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you choose between memoization and tabulation for a dynamic programming problem?",
            difficulty: Difficulty.MEDIUM,
          },
          // HARD (10)
          {
            question: "How would you implement an LRU cache with constant-time lookup and updates?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you maintain a running median from a stream of numbers?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you detect dependency cycles and produce an installation order for packages?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you find shortest paths with non-negative weighted edges and explain why BFS is insufficient?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you design a prefix search structure and compare its memory cost with a sorted array?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you find the minimum window containing a required multiset of characters?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you reconstruct one longest increasing subsequence efficiently?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you process connectivity queries using a disjoint-set data structure?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you merge many sorted streams when the combined data cannot fit in memory?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you prove an algorithm's correctness and identify adversarial inputs beyond sample tests?",
            difficulty: Difficulty.HARD,
          },
        ],
      },
      {
        name: "Databases & SQL",
        description: "Databases & SQL interview questions covering fundamentals, applied implementation, and troubleshooting.",
        sortOrder: 2,
        questions: [
          // EASY (10)
          {
            question: "What is the difference between a primary key and a foreign key?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "How would you select active users and order them by creation time?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "How do WHERE and HAVING differ?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "What is the difference between an INNER JOIN and a LEFT JOIN?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "How does NULL differ from an empty string or zero?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "What does a UNIQUE constraint enforce?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "How would you count questions in each category with GROUP BY?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "What is a database index used for?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "What does a transaction allow an application to do safely?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "Why are parameterized queries safer than string concatenation?",
            difficulty: Difficulty.EASY,
          },
          // MEDIUM (10)
          {
            question: "How would you find categories that have no questions using a LEFT JOIN?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you choose a composite index for filtering by category and ordering by date?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you read an execution plan to investigate a slow query?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you avoid double-counting when joining two one-to-many relationships?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you model users bookmarking many questions?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you retrieve the most recent record per user using a window function?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How do offset pagination and keyset pagination differ as data grows?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you use constraints to prevent invalid records even when application validation fails?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you explain dirty reads, non-repeatable reads, and phantom reads?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you import data while reporting duplicate and invalid rows?",
            difficulty: Difficulty.MEDIUM,
          },
          // HARD (10)
          {
            question: "How would you prevent lost updates when two transactions edit the same record?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you migrate a large table's column without blocking normal traffic for a long period?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you diagnose a database deadlock and reduce its recurrence?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you design a deduplication operation that is safe under concurrent inserts?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you preserve pagination correctness when rows are inserted during browsing?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you choose transaction isolation for a reservation system and test its guarantees?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you investigate a query that becomes slow only for certain parameter values?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you recover from an accidental deletion using backups and transaction logs where available?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you partition a rapidly growing event table and evaluate the operational trade-offs?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you validate consistency after moving records between database systems?",
            difficulty: Difficulty.HARD,
          },
        ],
      },
      {
        name: "Networking & HTTP",
        description: "Networking & HTTP interview questions covering fundamentals, applied implementation, and troubleshooting.",
        sortOrder: 3,
        questions: [
          // EASY (10)
          {
            question: "What happens during a DNS lookup for a website?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "How do TCP and UDP differ in delivery guarantees?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "What is the purpose of a port number?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "How does HTTPS differ from plain HTTP?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "What do HTTP request headers and response headers carry?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "What is the difference between a private IP address and a public IP address?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "How do a router and a switch serve different network roles?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "What does an HTTP redirect tell a client to do?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "Why might a browser send a CORS preflight request?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "What does a subnet mask or prefix length describe?",
            difficulty: Difficulty.EASY,
          },
          // MEDIUM (10)
          {
            question: "How would you troubleshoot a website reachable by IP but not by hostname?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you distinguish connection timeout from connection refused?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How do cookies, authorization headers, and TLS protect different parts of a request?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you configure cache headers for static assets versus private user data?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you explain the difference between HTTP idempotency and a request happening only once?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How does a reverse proxy route requests to backend services?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you diagnose a TLS certificate hostname mismatch?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How do WebSockets differ from ordinary request-response HTTP communication?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you inspect whether a failed request reached the application server?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you identify the cause of a redirect loop behind a proxy?",
            difficulty: Difficulty.MEDIUM,
          },
          // HARD (10)
          {
            question: "How would you investigate intermittent connection resets across a load balancer and backend?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you design retry behavior that avoids amplifying a downstream outage?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you diagnose stale DNS resolution after a service migration?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you prevent incorrect client IP handling when requests pass through multiple proxies?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you investigate an upload that fails only above a certain payload size?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you reason about timeout budgets across client, proxy, application, and database layers?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you investigate why a CDN serves another user's personalized response?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you troubleshoot long-lived connections dropped during deployments?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you investigate packet loss without assuming every missing ping explains application failures?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you coordinate a domain and certificate migration with a safe rollback plan?",
            difficulty: Difficulty.HARD,
          },
        ],
      },
      {
        name: "Application Security",
        description: "Application Security interview questions covering fundamentals, applied implementation, and troubleshooting.",
        sortOrder: 4,
        questions: [
          // EASY (10)
          {
            question: "How do authentication and authorization protect different actions?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "Why should passwords be hashed rather than stored in plaintext?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "What is SQL injection and how do parameterized queries help prevent it?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "What is cross-site scripting in a web application?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "Why should an application validate uploaded file types and sizes?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "What is the principle of least privilege?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "Why should secrets not appear in source code or application logs?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "What does multi-factor authentication add to a password-based login?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "Why should error responses avoid exposing internal stack traces?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "What is the purpose of expiring a user session?",
            difficulty: Difficulty.EASY,
          },
          // MEDIUM (10)
          {
            question: "How would you prevent a user from accessing another user's record by changing an ID?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you design a password reset flow with expiring, single-use tokens?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you reduce CSRF risk for a cookie-authenticated application?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you distinguish input validation from output encoding?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you protect a login endpoint from brute-force attempts without locking out legitimate users unnecessarily?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you enforce permissions for direct file-download requests?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you manage secrets separately across development, staging, and production?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you review third-party dependencies for known vulnerabilities?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you configure cookies to reduce exposure to scripts and insecure transport?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you design security logging without collecting unnecessary personal data?",
            difficulty: Difficulty.MEDIUM,
          },
          // HARD (10)
          {
            question: "How would you threat-model an application that imports files from user-provided URLs?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you investigate and contain a leaked production API key?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you test for privilege escalation in a multi-role admin application?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you prevent an SSRF feature from reaching internal services or metadata endpoints?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you design secure tenant isolation across database queries, caches, and object storage?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you respond when an authenticated user is compromised but their requests appear valid?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you assess a stored-XSS vulnerability in an administrator's content editor?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you implement account recovery without creating an easier route around multi-factor authentication?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you verify that a fix closes an access-control flaw across all affected endpoints?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you prioritize remediation when a dependency vulnerability exists but its exploitability is uncertain?",
            difficulty: Difficulty.HARD,
          },
        ],
      },
      {
        name: "Software Testing & QA",
        description: "Software Testing & QA interview questions covering fundamentals, applied implementation, and troubleshooting.",
        sortOrder: 5,
        questions: [
          // EASY (10)
          {
            question: "What is the difference between a unit test and an integration test?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "What does an end-to-end test verify?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "How would you write a clear expected result for a login test case?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "Why should tests be repeatable and independent?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "What is a boundary value and why should it be tested?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "How does a regression test protect an existing feature?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "What is the difference between a test failure and a defect in the product?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "What information should a useful bug report include?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "Why does high code coverage not guarantee correct behavior?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "How would you test a required form field with valid and invalid input?",
            difficulty: Difficulty.EASY,
          },
          // MEDIUM (10)
          {
            question: "How would you choose which parts of a checkout flow to unit-test and integration-test?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you test an endpoint's authentication and authorization separately?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you control time in tests for expiring tokens?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you test retry logic without waiting for real network timeouts?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you design test data that avoids dependencies between test cases?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you investigate a test that fails intermittently in CI?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you test database constraints and transaction rollback behavior?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you test accessibility beyond checking that a page visually looks correct?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you validate pagination with empty, partial, and full result pages?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you use contract tests between a frontend and an API?",
            difficulty: Difficulty.MEDIUM,
          },
          // HARD (10)
          {
            question: "How would you design a test strategy for a concurrent booking system with limited inventory?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you determine whether to quarantine, fix, or remove a flaky end-to-end test?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you test idempotency when duplicate requests arrive at nearly the same time?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you validate a migration against production-like data without exposing private records?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you test an outage in an external dependency and verify graceful degradation?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you identify meaningful properties for property-based testing of a parser?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you distinguish load, stress, and soak testing for a long-running service?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you design a release gate that balances feedback speed and failure risk?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you test an AI-assisted feature whose outputs vary between runs?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you reproduce a production-only defect when logs are incomplete and the data is sensitive?",
            difficulty: Difficulty.HARD,
          },
        ],
      },
      {
        name: "System Design",
        description: "System Design interview questions covering fundamentals, applied implementation, and troubleshooting.",
        sortOrder: 6,
        questions: [
          // EASY (10)
          {
            question: "What is the difference between vertical and horizontal scaling?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "What does a load balancer distribute?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "Why might an application place a cache in front of its database?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "How does a message queue separate request handling from background work?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "What is the difference between latency and throughput?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "Why should a service define a timeout for downstream calls?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "What is a single point of failure?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "How does replication differ from partitioning?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "What information would you ask for before designing a URL shortener?",
            difficulty: Difficulty.EASY,
          },
          {
            question: "What is the difference between an availability target and a recovery-time target?",
            difficulty: Difficulty.EASY,
          },
          // MEDIUM (10)
          {
            question: "How would you design an interview question service for read-heavy traffic?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you choose cache keys and expiration for category pages?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you design a notification service that supports retries?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you estimate storage growth for uploaded images from stated usage assumptions?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you design cursor pagination for an activity feed?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you explain consistency trade-offs when reading from replicas?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you add rate limiting to a public search API?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you design observability across an API and its background workers?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you choose between a modular monolith and separate services for a small team?",
            difficulty: Difficulty.MEDIUM,
          },
          {
            question: "How would you design a file processing workflow with visible job status?",
            difficulty: Difficulty.MEDIUM,
          },
          // HARD (10)
          {
            question: "How would you design assessment submission to survive retries without creating duplicate attempts?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you prevent a cache stampede when a popular key expires?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you design a multi-tenant service with explicit isolation and fair resource usage?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you handle out-of-order events while building a user's activity history?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you reconcile inventory across services when a distributed transaction is unavailable?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you plan disaster recovery using explicit recovery-point and recovery-time objectives?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you migrate a high-traffic service's data store while maintaining correctness?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you shed load during an overload without making a retry storm worse?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you design global read access while explaining the limits of cross-region write consistency?",
            difficulty: Difficulty.HARD,
          },
          {
            question: "How would you evaluate a proposed architecture against cost, failure modes, team capacity, and expected growth?",
            difficulty: Difficulty.HARD,
          },
        ],
      },
    ],
  },
];
