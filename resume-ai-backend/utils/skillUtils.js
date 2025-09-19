// Comprehensive skill database with categories and synonyms - ENHANCED FOR MAXIMUM COVERAGE
const skillDatabase = {
  // Programming Languages - EXPANDED
  programming: {
    'javascript': ['js', 'ecmascript', 'es6', 'es2015', 'es2020', 'vanilla js'],
    'typescript': ['ts', 'typed javascript'],
    'python': ['py', 'python3', 'python2'],
    'java': ['jvm', 'java8', 'java11', 'java17', 'openjdk'],
    'c#': ['csharp', 'c sharp', 'c-sharp', 'dotnet', '.net'],
    'c++': ['cpp', 'c plus plus', 'cplusplus'],
    'c': ['c language', 'ansi c'],
    'php': ['php7', 'php8'],
    'ruby': ['rb', 'ruby on rails'],
    'go': ['golang', 'go lang'],
    'rust': ['rustlang', 'rust-lang'],
    'swift': ['swift ui', 'swiftui'],
    'kotlin': ['kt'],
    'scala': ['scala lang'],
    'r': ['r programming', 'r studio', 'rstudio'],
    'matlab': ['mat lab'],
    'perl': ['perl5'],
    'shell': ['bash', 'zsh', 'fish', 'sh'],
    'powershell': ['pwsh', 'powershell core'],
    'dart': ['flutter dart'],
    'lua': ['lua script'],
    'groovy': ['apache groovy'],
    'erlang': ['erl'],
    'elixir': ['ex'],
    'haskell': ['hs'],
    'clojure': ['clj'],
    'f#': ['fsharp', 'f sharp'],
    'vb.net': ['visual basic', 'vb net'],
    'cobol': ['cobol programming'],
    'fortran': ['fortran90']
  },

  // Frontend Technologies - MASSIVELY EXPANDED
  frontend: {
    'react': ['reactjs', 'react.js', 'jsx', 'react hooks', 'react native'],
    'angular': ['angularjs', 'angular2', 'angular4', 'angular8', 'angular12', 'ng'],
    'vue': ['vue.js', 'vuejs', 'vue2', 'vue3'],
    'svelte': ['sveltejs', 'svelte kit'],
    'html': ['html5', 'markup', 'semantic html', 'hypertext'],
    'css': ['css3', 'cascading style sheets'],
    'sass': ['scss', 'syntactically awesome stylesheets'],
    'less': ['less css'],
    'stylus': ['stylus css'],
    'bootstrap': ['bootstrap 3', 'bootstrap 4', 'bootstrap 5', 'twitter bootstrap'],
    'tailwind': ['tailwind css', 'tailwindcss'],
    'bulma': ['bulma css'],
    'foundation': ['foundation css'],
    'material-ui': ['mui', 'material ui', '@mui'],
    'ant design': ['antd', 'ant-design'],
    'chakra ui': ['chakra-ui'],
    'semantic ui': ['semantic-ui'],
    'jquery': ['jquery ui', 'jquery mobile'],
    'backbone': ['backbone.js', 'backbonejs'],
    'ember': ['ember.js', 'emberjs'],
    'knockout': ['knockout.js', 'knockoutjs'],
    'webpack': ['bundler', 'module bundler'],
    'vite': ['vitejs', 'build tool'],
    'parcel': ['parcel bundler'],
    'rollup': ['rollup.js'],
    'gulp': ['gulp.js', 'task runner'],
    'grunt': ['grunt.js', 'gruntjs'],
    'next.js': ['nextjs', 'next', 'react framework'],
    'nuxt': ['nuxt.js', 'nuxtjs', 'vue framework'],
    'gatsby': ['gatsbyjs', 'gatsby.js'],
    'astro': ['astro build'],
    'remix': ['remix run'],
    'solid': ['solidjs', 'solid.js'],
    'lit': ['lit element', 'lit-html'],
    'stencil': ['stenciljs'],
    'alpine': ['alpine.js', 'alpinejs'],
    'stimulus': ['stimulus.js'],
    'htmx': ['htmx.org']
  },

  // Backend Technologies - EXPANDED
  backend: {
    'node.js': ['nodejs', 'node', 'npm', 'yarn'],
    'express': ['express.js', 'expressjs'],
    'fastify': ['fastify.js'],
    'koa': ['koa.js', 'koajs'],
    'hapi': ['hapi.js', 'hapijs'],
    'django': ['python web framework'],
    'flask': ['python microframework'],
    'fastapi': ['python async', 'python api'],
    'tornado': ['python tornado'],
    'pyramid': ['python pyramid'],
    'spring': ['spring boot', 'spring framework', 'spring mvc'],
    'spring boot': ['springboot'],
    'struts': ['apache struts'],
    'play': ['play framework'],
    'rails': ['ruby on rails', 'ror'],
    'sinatra': ['ruby sinatra'],
    'laravel': ['php framework'],
    'symfony': ['php symfony'],
    'codeigniter': ['php codeigniter'],
    'yii': ['yii framework'],
    'cakephp': ['cake php'],
    'asp.net': ['aspnet', 'asp net', '.net core', 'dotnet core'],
    'asp.net mvc': ['mvc framework'],
    'web api': ['api development'],
    'wcf': ['windows communication foundation'],
    'nestjs': ['nest.js', 'typescript backend'],
    'adonis': ['adonisjs'],
    'sails': ['sails.js'],
    'meteor': ['meteorjs'],
    'phoenix': ['elixir phoenix'],
    'gin': ['go gin'],
    'echo': ['go echo'],
    'fiber': ['go fiber'],
    'actix': ['rust actix'],
    'rocket': ['rust rocket'],
    'vapor': ['swift vapor'],
    'kitura': ['swift kitura']
  },

  // Databases - COMPREHENSIVE
  databases: {
    'mysql': ['sql', 'mariadb', 'percona'],
    'postgresql': ['postgres', 'psql', 'postgre'],
    'mongodb': ['mongo', 'nosql', 'document database'],
    'redis': ['cache', 'in-memory', 'redis cache'],
    'elasticsearch': ['elastic', 'search engine', 'elk'],
    'sqlite': ['embedded database', 'sqlite3'],
    'oracle': ['oracle db', 'oracle database'],
    'sql server': ['mssql', 'microsoft sql', 'ms sql'],
    'cassandra': ['distributed database', 'apache cassandra'],
    'dynamodb': ['aws database', 'aws dynamo'],
    'couchdb': ['apache couchdb'],
    'couchbase': ['couchbase server'],
    'neo4j': ['graph database'],
    'orientdb': ['multi-model database'],
    'arangodb': ['arango database'],
    'influxdb': ['time series database'],
    'clickhouse': ['clickhouse database'],
    'cockroachdb': ['cockroach database'],
    'fauna': ['faunadb'],
    'supabase': ['postgres backend'],
    'firebase': ['google firebase', 'firestore'],
    'planetscale': ['mysql platform'],
    'snowflake': ['data warehouse'],
    'bigquery': ['google bigquery'],
    'redshift': ['aws redshift'],
    'databricks': ['data analytics'],
    'sql': ['structured query language', 'database queries', 'query language']
  },

  // Data Science & Analytics - COMPREHENSIVE
  data_science: {
    'pandas': ['data manipulation', 'dataframes', 'python pandas'],
    'numpy': ['numerical computing', 'arrays', 'python numpy'],
    'matplotlib': ['data visualization', 'plotting', 'python matplotlib'],
    'seaborn': ['statistical visualization', 'python seaborn'],
    'plotly': ['interactive visualization', 'plotly dash'],
    'bokeh': ['interactive visualization', 'python bokeh'],
    'altair': ['statistical visualization'],
    'scikit-learn': ['sklearn', 'machine learning', 'ml', 'python sklearn'],
    'tensorflow': ['deep learning', 'neural networks', 'tf'],
    'pytorch': ['deep learning framework', 'torch'],
    'keras': ['neural network api', 'deep learning'],
    'xgboost': ['gradient boosting', 'xgb'],
    'lightgbm': ['gradient boosting', 'lgb'],
    'catboost': ['gradient boosting'],
    'jupyter': ['jupyter notebook', 'ipython', 'jupyterlab'],
    'anaconda': ['data science platform', 'conda'],
    'spyder': ['python ide'],
    'rstudio': ['r studio', 'r ide'],
    'tableau': ['business intelligence', 'bi', 'data viz'],
    'power bi': ['microsoft bi', 'business intelligence', 'powerbi'],
    'qlik': ['qlik sense', 'qlikview'],
    'looker': ['google looker'],
    'excel': ['microsoft excel', 'spreadsheets', 'ms excel'],
    'google sheets': ['spreadsheets'],
    'statistics': ['statistical analysis', 'stats', 'statistical modeling'],
    'machine learning': ['ml', 'artificial intelligence', 'ai'],
    'deep learning': ['neural networks', 'dl', 'artificial neural networks'],
    'data visualization': ['data viz', 'charts', 'graphs', 'dashboards'],
    'data analysis': ['data analytics', 'analysis', 'data mining'],
    'data mining': ['pattern recognition', 'knowledge discovery'],
    'big data': ['large datasets', 'data processing'],
    'apache spark': ['spark', 'big data processing', 'pyspark'],
    'hadoop': ['big data framework', 'apache hadoop'],
    'kafka': ['apache kafka', 'streaming'],
    'airflow': ['apache airflow', 'workflow'],
    'dbt': ['data build tool'],
    'mlflow': ['ml lifecycle'],
    'kubeflow': ['ml pipelines'],
    'r': ['r programming', 'r studio', 'statistical computing'],
    'sas': ['statistical software', 'sas programming'],
    'spss': ['statistical package', 'ibm spss'],
    'stata': ['statistical software'],
    'nlp': ['natural language processing', 'text analysis'],
    'computer vision': ['cv', 'image processing'],
    'reinforcement learning': ['rl'],
    'time series': ['forecasting', 'temporal analysis']
  },

  // Cloud & DevOps - COMPREHENSIVE
  cloud: {
    'aws': ['amazon web services', 'ec2', 's3', 'lambda', 'rds', 'dynamodb', 'cloudformation'],
    'azure': ['microsoft azure', 'azure functions', 'azure devops', 'azure ad'],
    'gcp': ['google cloud', 'google cloud platform', 'google compute engine'],
    'alibaba cloud': ['aliyun'],
    'oracle cloud': ['oci'],
    'ibm cloud': ['ibm watson'],
    'digitalocean': ['do', 'digital ocean'],
    'linode': ['linode cloud'],
    'vultr': ['vultr cloud'],
    'heroku': ['heroku platform'],
    'netlify': ['netlify platform'],
    'vercel': ['vercel platform', 'zeit'],
    'cloudflare': ['cf', 'cloudflare workers'],
    'docker': ['containerization', 'containers', 'dockerfile'],
    'kubernetes': ['k8s', 'container orchestration', 'k8'],
    'openshift': ['red hat openshift'],
    'jenkins': ['ci/cd', 'continuous integration', 'jenkins pipeline'],
    'github actions': ['github ci/cd', 'gh actions'],
    'gitlab ci': ['gitlab cicd'],
    'circle ci': ['circleci'],
    'travis ci': ['travis-ci'],
    'azure devops': ['azure pipelines', 'tfs'],
    'teamcity': ['jetbrains teamcity'],
    'bamboo': ['atlassian bamboo'],
    'terraform': ['infrastructure as code', 'iac', 'hashicorp terraform'],
    'ansible': ['configuration management', 'red hat ansible'],
    'puppet': ['configuration management'],
    'chef': ['configuration management'],
    'vagrant': ['virtualization', 'hashicorp vagrant'],
    'packer': ['image building', 'hashicorp packer'],
    'consul': ['service discovery', 'hashicorp consul'],
    'vault': ['secrets management', 'hashicorp vault'],
    'nomad': ['job scheduler', 'hashicorp nomad'],
    'helm': ['kubernetes package manager'],
    'istio': ['service mesh'],
    'linkerd': ['service mesh'],
    'prometheus': ['monitoring', 'metrics'],
    'grafana': ['dashboards', 'visualization'],
    'elk stack': ['elasticsearch logstash kibana'],
    'splunk': ['log analysis'],
    'datadog': ['monitoring'],
    'new relic': ['application monitoring'],
    'nagios': ['infrastructure monitoring'],
    'zabbix': ['monitoring platform']
  },

  // Mobile Development - COMPREHENSIVE  
  mobile: {
    'react native': ['rn', 'react-native'],
    'flutter': ['dart flutter', 'google flutter'],
    'ionic': ['ionic framework'],
    'xamarin': ['microsoft xamarin'],
    'cordova': ['apache cordova', 'phonegap'],
    'nativescript': ['native script'],
    'swift': ['ios development', 'swiftui'],
    'objective-c': ['objc', 'ios development'],
    'kotlin': ['android development', 'kotlin android'],
    'java': ['android java'],
    'android studio': ['android ide'],
    'xcode': ['ios ide'],
    'android sdk': ['android development kit'],
    'ios sdk': ['ios development kit'],
    'firebase': ['google firebase', 'mobile backend'],
    'realm': ['mobile database'],
    'sqlite': ['mobile database'],
    'push notifications': ['fcm', 'apns'],
    'app store': ['ios app store'],
    'google play': ['android play store'],
    'unity': ['game development', 'unity3d'],
    'unreal engine': ['ue4', 'ue5', 'game development'],
    'cocos2d': ['game framework'],
    'corona sdk': ['solar2d']
  },

  // Testing & QA - COMPREHENSIVE
  testing: {
    'jest': ['javascript testing', 'react testing'],
    'mocha': ['javascript testing'],
    'chai': ['assertion library'],
    'jasmine': ['javascript testing'],
    'karma': ['test runner'],
    'cypress': ['e2e testing', 'end to end'],
    'selenium': ['web automation', 'webdriver'],
    'webdriver': ['browser automation'],
    'playwright': ['browser testing'],
    'puppeteer': ['headless chrome'],
    'testcafe': ['e2e testing'],
    'enzyme': ['react testing'],
    'testing library': ['react testing library'],
    'pytest': ['python testing'],
    'unittest': ['python unit testing'],
    'nose': ['python testing'],
    'junit': ['java testing'],
    'testng': ['java testing'],
    'mockito': ['java mocking'],
    'rspec': ['ruby testing'],
    'minitest': ['ruby testing'],
    'phpunit': ['php testing'],
    'pest': ['php testing'],
    'nunit': ['c# testing'],
    'xunit': ['c# testing'],
    'mstest': ['microsoft testing'],
    'postman': ['api testing'],
    'insomnia': ['api testing'],
    'newman': ['postman cli'],
    'rest assured': ['api testing'],
    'karate': ['api testing'],
    'jmeter': ['performance testing', 'load testing'],
    'gatling': ['performance testing'],
    'locust': ['load testing'],
    'k6': ['performance testing'],
    'artillery': ['load testing'],
    'appium': ['mobile testing'],
    'detox': ['mobile testing'],
    'espresso': ['android testing'],
    'xctest': ['ios testing'],
    'cucumber': ['bdd testing', 'behavior driven'],
    'gherkin': ['bdd language'],
    'allure': ['test reporting'],
    'browserstack': ['cross browser testing'],
    'sauce labs': ['cloud testing'],
    'lambdatest': ['browser testing']
  },

  // Tools & IDEs - COMPREHENSIVE
  tools: {
    'git': ['version control', 'github', 'gitlab', 'bitbucket'],
    'svn': ['subversion', 'version control'],
    'mercurial': ['hg', 'version control'],
    'perforce': ['p4', 'version control'],
    'visual studio code': ['vscode', 'vs code'],
    'visual studio': ['vs', 'microsoft visual studio'],
    'intellij idea': ['intellij', 'jetbrains idea'],
    'webstorm': ['jetbrains webstorm'],
    'pycharm': ['jetbrains pycharm'],
    'phpstorm': ['jetbrains phpstorm'],
    'rubymine': ['jetbrains rubymine'],
    'clion': ['jetbrains clion'],
    'datagrip': ['jetbrains datagrip'],
    'eclipse': ['eclipse ide'],
    'netbeans': ['apache netbeans'],
    'atom': ['github atom'],
    'sublime text': ['sublime'],
    'vim': ['vi editor'],
    'emacs': ['emacs editor'],
    'nano': ['nano editor'],
    'notepad++': ['notepad plus'],
    'brackets': ['adobe brackets'],
    'android studio': ['android ide'],
    'xcode': ['apple xcode'],
    'jira': ['project management', 'atlassian jira'],
    'confluence': ['documentation', 'atlassian confluence'],
    'trello': ['project management'],
    'asana': ['project management'],
    'monday': ['project management'],
    'notion': ['documentation', 'project management'],
    'slack': ['communication', 'team chat'],
    'discord': ['communication'],
    'microsoft teams': ['ms teams', 'communication'],
    'zoom': ['video conferencing'],
    'figma': ['design tool', 'ui/ux', 'prototyping'],
    'sketch': ['design tool', 'ui design'],
    'adobe xd': ['xd', 'ui/ux design'],
    'invision': ['prototyping'],
    'zeplin': ['design handoff'],
    'abstract': ['design version control'],
    'photoshop': ['adobe photoshop', 'image editing'],
    'illustrator': ['adobe illustrator', 'vector graphics'],
    'after effects': ['adobe after effects', 'motion graphics'],
    'premiere pro': ['adobe premiere', 'video editing'],
    'blender': ['3d modeling', '3d animation'],
    'maya': ['autodesk maya', '3d modeling'],
    '3ds max': ['autodesk 3ds max'],
    'cinema 4d': ['c4d', '3d modeling'],
    'postman': ['api testing', 'api development'],
    'insomnia': ['api testing'],
    'swagger': ['api documentation', 'openapi'],
    'redis': ['caching', 'in-memory database'],
    'rabbitmq': ['message queue', 'message broker'],
    'apache kafka': ['streaming', 'message broker'],
    'elasticsearch': ['search engine', 'logging'],
    'logstash': ['log processing'],
    'kibana': ['log visualization'],
    'splunk': ['log analysis'],
    'wireshark': ['network analysis'],
    'charles proxy': ['network debugging'],
    'fiddler': ['web debugging']
  },

  // Methodologies & Practices - ENHANCED
  methodologies: {
    'agile': ['scrum', 'kanban', 'sprint', 'agile methodology'],
    'scrum': ['agile methodology', 'sprint planning', 'scrum master'],
    'kanban': ['agile methodology', 'lean'],
    'lean': ['lean methodology', 'lean startup'],
    'waterfall': ['waterfall methodology', 'traditional sdlc'],
    'devops': ['development operations', 'devops culture'],
    'devsecops': ['security devops'],
    'tdd': ['test driven development', 'test first'],
    'bdd': ['behavior driven development'],
    'ci/cd': ['continuous integration', 'continuous deployment', 'continuous delivery'],
    'microservices': ['service oriented architecture', 'soa', 'distributed systems'],
    'monolith': ['monolithic architecture'],
    'serverless': ['faas', 'function as a service'],
    'api development': ['rest api', 'restful', 'api design'],
    'rest api': ['restful api', 'web services', 'http api'],
    'graphql': ['query language', 'api', 'graph api'],
    'soap': ['soap api', 'web services'],
    'grpc': ['remote procedure call', 'google rpc'],
    'websockets': ['real-time communication', 'socket.io'],
    'oauth': ['authentication', 'authorization'],
    'jwt': ['json web tokens', 'authentication'],
    'saml': ['single sign on', 'sso'],
    'ldap': ['directory services', 'active directory'],
    'ssl/tls': ['encryption', 'security'],
    'https': ['secure http', 'web security'],
    'cors': ['cross origin resource sharing'],
    'csrf': ['cross site request forgery', 'security'],
    'xss': ['cross site scripting', 'security'],
    'sql injection': ['security vulnerability'],
    'penetration testing': ['pen testing', 'security testing'],
    'code review': ['peer review', 'pull request'],
    'pair programming': ['collaborative coding'],
    'mob programming': ['team programming'],
    'design patterns': ['software patterns', 'gang of four'],
    'solid principles': ['software design'],
    'clean code': ['code quality', 'refactoring'],
    'clean architecture': ['software architecture'],
    'domain driven design': ['ddd', 'software design'],
    'event driven architecture': ['eda', 'event sourcing'],
    'cqrs': ['command query responsibility segregation'],
    'mvc': ['model view controller', 'design pattern'],
    'mvp': ['model view presenter'],
    'mvvm': ['model view viewmodel'],
    'repository pattern': ['data access pattern'],
    'factory pattern': ['creational pattern'],
    'observer pattern': ['behavioral pattern'],
    'singleton pattern': ['design pattern'],
    'dependency injection': ['di', 'inversion of control'],
    'aspect oriented programming': ['aop'],
    'functional programming': ['fp', 'immutable'],
    'object oriented programming': ['oop', 'inheritance', 'polymorphism'],
    'reactive programming': ['rxjs', 'reactive extensions'],
    'event sourcing': ['event store'],
    'caching': ['redis', 'memcached', 'performance'],
    'load balancing': ['high availability', 'scalability'],
    'database sharding': ['horizontal scaling'],
    'database indexing': ['query optimization'],
    'database normalization': ['data modeling'],
    'data warehousing': ['etl', 'olap'],
    'business intelligence': ['bi', 'analytics'],
    'machine learning': ['ml', 'ai', 'predictive modeling'],
    'deep learning': ['neural networks', 'ai'],
    'natural language processing': ['nlp', 'text processing'],
    'computer vision': ['image processing', 'cv'],
    'blockchain': ['cryptocurrency', 'distributed ledger'],
    'smart contracts': ['ethereum', 'solidity'],
    'web3': ['decentralized web', 'dapps'],
    'nft': ['non-fungible tokens'],
    'defi': ['decentralized finance'],
    'iot': ['internet of things', 'embedded systems'],
    'edge computing': ['edge devices'],
    'quantum computing': ['quantum algorithms'],
    'ar/vr': ['augmented reality', 'virtual reality'],
    'progressive web apps': ['pwa', 'service workers'],
    'single page applications': ['spa'],
    'server side rendering': ['ssr'],
    'static site generation': ['ssg', 'jamstack'],
    'headless cms': ['content management'],
    'low code': ['no code', 'visual development'],
    'rpa': ['robotic process automation'],
    'etl': ['extract transform load', 'data pipeline'],
    'data pipeline': ['data engineering', 'data processing'],
    'stream processing': ['real-time processing'],
    'batch processing': ['bulk processing']
  },

  // Soft Skills & General - ENHANCED
  soft_skills: {
    'communication': ['verbal communication', 'written communication', 'presentation'],
    'teamwork': ['collaboration', 'team player', 'cross-functional'],
    'leadership': ['team leadership', 'project leadership', 'mentoring'],
    'problem solving': ['analytical thinking', 'critical thinking', 'troubleshooting'],
    'time management': ['project management', 'deadline management', 'prioritization'],
    'adaptability': ['flexibility', 'learning agility', 'change management'],
    'creativity': ['innovative thinking', 'creative problem solving'],
    'attention to detail': ['detail oriented', 'precision', 'quality focused'],
    'multitasking': ['task management', 'parallel processing'],
    'client facing': ['customer service', 'stakeholder management', 'client relations'],
    'project management': ['pmp', 'project planning', 'resource management'],
    'stakeholder management': ['client relations', 'business development'],
    'requirements gathering': ['business analysis', 'requirements engineering'],
    'documentation': ['technical writing', 'process documentation'],
    'training': ['knowledge transfer', 'skill development'],
    'mentoring': ['coaching', 'team development'],
    'conflict resolution': ['mediation', 'team dynamics'],
    'negotiation': ['contract negotiation', 'vendor management'],
    'strategic thinking': ['business strategy', 'long-term planning'],
    'decision making': ['executive decisions', 'risk assessment'],
    'emotional intelligence': ['eq', 'interpersonal skills'],
    'cultural awareness': ['diversity', 'inclusion'],
    'remote work': ['distributed teams', 'virtual collaboration'],
    'public speaking': ['presentations', 'conferences'],
    'networking': ['professional networking', 'relationship building'],
    'continuous learning': ['professional development', 'skill updates'],
    'innovation': ['creative solutions', 'disruptive thinking'],
    'risk management': ['risk assessment', 'mitigation strategies'],
    'budget management': ['financial planning', 'cost optimization'],
    'vendor management': ['supplier relations', 'procurement'],
    'compliance': ['regulatory compliance', 'audit'],
    'quality assurance': ['qa', 'process improvement'],
    'change management': ['organizational change', 'transformation'],
    'business development': ['sales', 'revenue growth'],
    'market research': ['competitive analysis', 'market intelligence'],
    'user experience': ['ux', 'user research', 'usability'],
    'customer experience': ['cx', 'customer journey'],
    'digital transformation': ['modernization', 'digital strategy'],
    'automation': ['process automation', 'efficiency improvement'],
    'scalability': ['growth planning', 'system scaling'],
    'performance optimization': ['efficiency', 'speed improvement']
  }
};

// Enhanced skill normalization to match jobParser functionality
function normalizeSkillWithJobParser(skill) {
  const { normalizeExternalSkill } = require('../services/jobParser');
  return normalizeExternalSkill(skill);
}

// Helper function to extract skills from resume text with advanced NLP
function extractSkillsFromText(text) {
  const foundSkills = new Set();
  const lowerText = text.toLowerCase();
  
  // Normalize text - remove special characters but keep important ones
  const normalizedText = lowerText.replace(/[^\w\s\.\-\+#]/g, ' ');
  
  // Map high-level terms to specific skills (same as jobParser)
  const skillMappings = {
    'frontend': ['html', 'css', 'javascript', 'react', 'angular', 'vue'],
    'front-end': ['html', 'css', 'javascript', 'react', 'angular', 'vue'],
    'frontend development': ['html', 'css', 'javascript', 'react', 'angular', 'vue'],
    'ui/ux': ['html', 'css', 'javascript', 'figma'],
    'web development': ['html', 'css', 'javascript'],
    'backend': ['node.js', 'python', 'java', 'sql', 'api development'],
    'back-end': ['node.js', 'python', 'java', 'sql', 'api development'],
    'backend development': ['node.js', 'python', 'java', 'sql', 'api development'],
    'server-side': ['node.js', 'python', 'java', 'sql'],
    'database': ['sql', 'mysql', 'postgresql', 'mongodb'],
    'databases': ['sql', 'mysql', 'postgresql', 'mongodb'],
    'cloud': ['aws', 'azure', 'gcp'],
    'cloud computing': ['aws', 'azure', 'gcp'],
    'devops': ['docker', 'kubernetes', 'jenkins', 'ci/cd'],
    'version control': ['git'],
    'testing': ['jest', 'selenium', 'pytest'],
    'web frameworks': ['react', 'angular', 'vue', 'django', 'flask'],
    'mobile development': ['react native', 'flutter', 'swift', 'kotlin'],
    'data analysis': ['pandas', 'numpy', 'python', 'sql', 'excel'],
    'data science': ['pandas', 'numpy', 'matplotlib', 'scikit-learn', 'python', 'statistics'],
    'machine learning': ['scikit-learn', 'tensorflow', 'pytorch', 'python', 'statistics'],
    'data visualization': ['matplotlib', 'seaborn', 'plotly', 'tableau', 'power bi'],
    'business intelligence': ['tableau', 'power bi', 'sql', 'excel'],
    'statistical analysis': ['statistics', 'python', 'r', 'excel']
  };

  // First, check for high-level terms and expand them - BUT ONLY if specific skills aren't found
  const highLevelTermsFound = {};
  for (const [term, skills] of Object.entries(skillMappings)) {
    if (normalizedText.includes(term)) {
      highLevelTermsFound[term] = skills;
    }
  }
  
  // Extract skills from all categories - only actual skills present in text
  for (const category in skillDatabase) {
    for (const [skill, synonyms] of Object.entries(skillDatabase[category])) {
      // Check for exact skill match
      if (isSkillPresent(normalizedText, skill)) {
        foundSkills.add(skill);
      }
      
      // Check for synonyms
      for (const synonym of synonyms) {
        if (isSkillPresent(normalizedText, synonym)) {
          foundSkills.add(skill); // Add the main skill, not the synonym
        }
      }
    }
  }
  
  // ONLY add high-level term expansions if no specific skills from that category were found
  for (const [term, skills] of Object.entries(highLevelTermsFound)) {
    let hasSpecificSkills = false;
    for (const skill of skills) {
      if (foundSkills.has(skill)) {
        hasSpecificSkills = true;
        break;
      }
    }
    
    // If no specific skills found, but general term is mentioned, add some common ones
    if (!hasSpecificSkills) {
      // Add only a conservative subset, not all possibilities
      if (term.includes('frontend') || term.includes('front-end')) {
        if (normalizedText.includes('react')) foundSkills.add('react');
        if (normalizedText.includes('angular')) foundSkills.add('angular');
        if (normalizedText.includes('vue')) foundSkills.add('vue');
        // Always add basics if frontend is mentioned
        foundSkills.add('html');
        foundSkills.add('css');
        foundSkills.add('javascript');
      } else if (term.includes('backend') || term.includes('back-end')) {
        // Only add if we can infer from context
        if (normalizedText.includes('node')) foundSkills.add('node.js');
        if (normalizedText.includes('python')) foundSkills.add('python');
        if (normalizedText.includes('java')) foundSkills.add('java');
      }
      // For cloud, database etc. - DON'T auto-add anything unless explicitly mentioned
    }
  }
  
  return Array.from(foundSkills);
}

// Helper function to check if a skill is present with context awareness
function isSkillPresent(text, skill) {
  const skillPattern = new RegExp(`\\b${escapeRegExp(skill)}\\b`, 'i');
  
  if (!skillPattern.test(text)) {
    return false;
  }
  
  // Context validation - avoid false positives
  const negativeContexts = [
    'no experience', 'not familiar', 'avoid', 'dislike', 'hate',
    'poor at', 'weak in', 'struggling with', 'difficulty with',
    'no knowledge', 'unfamiliar', 'never used', 'don\'t know'
  ];
  
  const skillIndex = text.search(skillPattern);
  if (skillIndex === -1) return false;
  
  // Check surrounding context (150 chars before and after for better context)
  const contextStart = Math.max(0, skillIndex - 150);
  const contextEnd = Math.min(text.length, skillIndex + skill.length + 150);
  const context = text.substring(contextStart, contextEnd);
  
  // Reject if negative context is found
  for (const negContext of negativeContexts) {
    if (context.toLowerCase().includes(negContext)) {
      console.log(`Rejected "${skill}" due to negative context: "${negContext}"`);
      return false;
    }
  }
  
  // Additional validation for common false positives
  // Ensure the skill isn't just part of a URL, email, or filename
  const beforeChar = skillIndex > 0 ? text[skillIndex - 1] : ' ';
  const afterChar = skillIndex + skill.length < text.length ? text[skillIndex + skill.length] : ' ';
  
  if (beforeChar === '.' || afterChar === '.' || 
      beforeChar === '@' || afterChar === '@' ||
      beforeChar === '/' || afterChar === '/') {
    console.log(`Rejected "${skill}" - appears to be part of URL/email/path`);
    return false;
  }
  
  return true;
}

// Escape special regex characters
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Advanced skill matching with fuzzy logic and semantic similarity
async function analyzeSkillMatch(resumeSkills, jobSkills) {
  const matched_skills = [];
  const missing_skills = [];
  const partial_matches = [];
  
  for (const jobSkill of jobSkills) {
    let bestMatch = null;
    let bestScore = 0;
    let matchType = 'none';
    
    const normalizedJobSkill = jobSkill.toLowerCase().trim();
    
    // Skip if job skill is empty or too short
    if (!normalizedJobSkill || normalizedJobSkill.length < 2) {
      missing_skills.push(jobSkill);
      continue;
    }
    
    for (const resumeSkill of resumeSkills) {
      const normalizedResumeSkill = resumeSkill.toLowerCase().trim();
      
      // Skip if resume skill is empty
      if (!normalizedResumeSkill || normalizedResumeSkill.length < 2) {
        continue;
      }
      
      // Exact match
      if (normalizedJobSkill === normalizedResumeSkill) {
        bestMatch = resumeSkill;
        bestScore = 1.0;
        matchType = 'exact';
        break;
      }
      
      // Partial match
      if (normalizedJobSkill.includes(normalizedResumeSkill) || 
          normalizedResumeSkill.includes(normalizedJobSkill)) {
        const score = calculatePartialMatchScore(normalizedJobSkill, normalizedResumeSkill);
        if (score > bestScore) {
          bestMatch = resumeSkill;
          bestScore = score;
          matchType = 'partial';
        }
      }
      
      // Semantic similarity (check if they're related technologies)
      const semanticScore = calculateSemanticSimilarity(normalizedJobSkill, normalizedResumeSkill);
      if (semanticScore > bestScore) {
        bestMatch = resumeSkill;
        bestScore = semanticScore;
        matchType = 'semantic';
      }
    }
    
    // Categorize based on match quality - stricter thresholds
    if (bestScore >= 0.95 || matchType === 'exact') {
      matched_skills.push({
        required: jobSkill,
        found: bestMatch,
        score: bestScore,
        type: matchType
      });
    } else if (bestScore >= 0.75 && matchType !== 'semantic') {
      // Only allow partial matches for fuzzy/partial matches, not semantic
      partial_matches.push({
        required: jobSkill,
        found: bestMatch,
        score: bestScore,
        type: matchType
      });
    } else if (bestScore >= 0.85 && matchType === 'semantic') {
      // Higher threshold for semantic matches to avoid false positives
      partial_matches.push({
        required: jobSkill,
        found: bestMatch,
        score: bestScore,
        type: matchType
      });
    } else {
      missing_skills.push(jobSkill);
    }
  }
  
  console.log('\n=== FINAL SKILL MATCHING RESULTS ===');
  console.log('- Exact/Strong matches:', matched_skills.length);
  console.log('- Partial matches:', partial_matches.length);
  console.log('- Missing skills:', missing_skills.length);
  console.log('Matched:', matched_skills.map(m => m.required));
  console.log('Partial:', partial_matches.map(m => m.required));
  console.log('Missing:', missing_skills);
  console.log('=== END SKILL MATCHING ===');
  
  return { 
    matched_skills: matched_skills.map(m => m.required),
    partial_matches: partial_matches,
    missing_skills,
    match_details: {
      exact_matches: matched_skills.filter(m => m.type === 'exact'),
      semantic_matches: matched_skills.filter(m => m.type === 'semantic'),
      partial_match_details: partial_matches
    }
  };
}

// Calculate partial match score based on string similarity - more conservative
function calculatePartialMatchScore(skill1, skill2) {
  const longer = skill1.length > skill2.length ? skill1 : skill2;
  const shorter = skill1.length > skill2.length ? skill2 : skill1;
  
  if (longer.length === 0) return 1.0;
  
  // Require minimum similarity for very short strings
  if (shorter.length < 3 && longer.length > shorter.length * 2) {
    return 0; // Too different in length for short strings
  }
  
  const editDistance = levenshteinDistance(longer, shorter);
  const similarity = (longer.length - editDistance) / longer.length;
  
  // Apply stricter thresholds
  if (similarity < 0.7) return 0; // Reject low similarity matches
  
  return similarity;
}

// Calculate semantic similarity based on technology relationships
function calculateSemanticSimilarity(skill1, skill2) {
  // Define technology relationships - enhanced with frontend/backend mappings
  const relatedTechnologies = {
    'frontend': ['html', 'css', 'javascript', 'react', 'angular', 'vue', 'typescript'],
    'front-end': ['html', 'css', 'javascript', 'react', 'angular', 'vue', 'typescript'],
    'backend': ['node.js', 'python', 'java', 'sql', 'api', 'express', 'django', 'spring'],
    'back-end': ['node.js', 'python', 'java', 'sql', 'api', 'express', 'django', 'spring'],
    'database': ['sql', 'mysql', 'postgresql', 'mongodb', 'redis'],
    'databases': ['sql', 'mysql', 'postgresql', 'mongodb', 'redis'],
    'react': ['javascript', 'jsx', 'redux', 'next.js', 'typescript', 'html', 'css'],
    'angular': ['typescript', 'javascript', 'rxjs', 'html', 'css'],
    'vue': ['javascript', 'nuxt', 'html', 'css'],
    'node.js': ['javascript', 'express', 'npm', 'backend'],
    'python': ['django', 'flask', 'fastapi', 'pandas', 'numpy', 'backend'],
    'java': ['spring', 'hibernate', 'maven', 'gradle', 'backend'],
    'javascript': ['react', 'angular', 'vue', 'node.js', 'frontend'],
    'html': ['css', 'javascript', 'frontend', 'web development'],
    'css': ['html', 'javascript', 'frontend', 'web development'],
    'sql': ['mysql', 'postgresql', 'database', 'backend'],
    'aws': ['cloud', 'ec2', 's3', 'lambda', 'dynamodb'],
    'docker': ['kubernetes', 'containerization', 'devops'],
    'git': ['github', 'version control', 'gitlab']
  };
  
  // Check if skills are directly related - more conservative scoring
  for (const [tech, related] of Object.entries(relatedTechnologies)) {
    if ((skill1.includes(tech) || tech.includes(skill1)) && 
        related.some(r => skill2.includes(r) || r.includes(skill2))) {
      return 0.7; // Lower score for semantic relationships
    }
    if ((skill2.includes(tech) || tech.includes(skill2)) && 
        related.some(r => skill1.includes(r) || r.includes(skill1))) {
      return 0.7;
    }
  }
  
  // Check for reverse relationships - even more conservative
  for (const [tech, related] of Object.entries(relatedTechnologies)) {
    if (related.includes(skill1) && (skill2.includes(tech) || tech.includes(skill2))) {
      return 0.65;
    }
    if (related.includes(skill2) && (skill1.includes(tech) || tech.includes(skill1))) {
      return 0.65;
    }
  }
  
  return 0;
}

// Levenshtein distance for string similarity
function levenshteinDistance(str1, str2) {
  const matrix = [];
  
  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }
  
  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }
  
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  
  return matrix[str2.length][str1.length];
}

// Enhanced recommendation generation with detailed analysis
function generateRecommendation(skillAnalysis, aiAnalysis) {
  const totalSkills = skillAnalysis.matched_skills.length + 
                     (skillAnalysis.partial_matches?.length || 0) + 
                     skillAnalysis.missing_skills.length;
  
  if (totalSkills === 0) {
    return "Unable to analyze - no specific technical skills found in job description";
  }
  
  const exactMatchPercentage = (skillAnalysis.matched_skills.length / totalSkills) * 100;
  const partialMatchPercentage = ((skillAnalysis.partial_matches?.length || 0) / totalSkills) * 100;
  const totalMatchPercentage = exactMatchPercentage + (partialMatchPercentage * 0.5);
  
  let recommendation = "";
  let priority = "";
  
  if (totalMatchPercentage >= 85) {
    recommendation = "Excellent match! This candidate demonstrates strong alignment with the technical requirements.";
    priority = "HIGH";
  } else if (totalMatchPercentage >= 70) {
    recommendation = "Very good match with minor skill gaps that can be addressed through training.";
    priority = "HIGH";
  } else if (totalMatchPercentage >= 55) {
    recommendation = "Good potential candidate with some skill development needed.";
    priority = "MEDIUM";
  } else if (totalMatchPercentage >= 35) {
    recommendation = "Moderate match - significant training required for missing skills.";
    priority = "MEDIUM";
  } else {
    recommendation = "Limited match - extensive skill development needed to meet requirements.";
    priority = "LOW";
  }
  
  return `${recommendation} (${Math.round(totalMatchPercentage)}% overall match, Priority: ${priority})`;
}

// Generate detailed recommendations array - OPTIMIZED FOR RELEVANCE
function generateDetailedRecommendations(skillAnalysis, resumeText, jobDescription) {
  const recommendations = [];
  
  // Only add skill-based recommendations if they provide new insights
  if (skillAnalysis.missing_skills.length > 0 && skillAnalysis.missing_skills.length <= 5) {
    const criticalMissing = skillAnalysis.missing_skills.slice(0, 2);
    recommendations.push(`📚 Focus on: ${criticalMissing.join(' and ')}`);
  }
  
  // Experience level analysis - only if meaningful
  const experienceLevel = analyzeExperienceLevel(resumeText);
  if (experienceLevel && !experienceLevel.includes('Unknown')) {
    recommendations.push(`💼 ${experienceLevel} - tailor application accordingly`);
  }
  
  return recommendations.filter(rec => rec && rec.trim().length > 0).slice(0, 2); // Maximum 2 detailed recommendations
}

// Analyze experience level from resume - SIMPLIFIED
function analyzeExperienceLevel(resumeText) {
  const lowerText = resumeText.toLowerCase();
  
  // Look for clear experience indicators
  const seniorKeywords = ['senior', 'lead', 'architect', 'principal', '8+ years', '10+ years'];
  const midKeywords = ['mid-level', '5+ years', '4+ years', '3+ years'];
  const juniorKeywords = ['junior', 'entry', 'graduate', '1 year', '2 years'];
  
  if (seniorKeywords.some(keyword => lowerText.includes(keyword))) {
    return "Senior level";
  } else if (midKeywords.some(keyword => lowerText.includes(keyword))) {
    return "Mid-level";
  } else if (juniorKeywords.some(keyword => lowerText.includes(keyword))) {
    return "Junior level";
  }
  
  return null; // Don't return "Unknown" - let it be null to avoid adding to recommendations
}

// Detect job role type for specific recommendations
function detectRoleType(jobDescription) {
  const lowerJob = jobDescription.toLowerCase();
  
  if (lowerJob.includes('frontend') || lowerJob.includes('ui/ux') || lowerJob.includes('react') || lowerJob.includes('angular')) {
    return 'frontend';
  } else if (lowerJob.includes('backend') || lowerJob.includes('api') || lowerJob.includes('database')) {
    return 'backend';
  } else if (lowerJob.includes('fullstack') || lowerJob.includes('full stack')) {
    return 'fullstack';
  } else if (lowerJob.includes('devops') || lowerJob.includes('cloud') || lowerJob.includes('infrastructure')) {
    return 'devops';
  } else if (lowerJob.includes('data scientist') || lowerJob.includes('machine learning') || lowerJob.includes('analytics')) {
    return 'data-science';
  }
  
  return null;
}

// Get role-specific advice
function getRoleSpecificAdvice(roleType, skillAnalysis) {
  const advice = {
    'frontend': 'Focus on modern UI frameworks and responsive design principles',
    'backend': 'Strengthen API design and database optimization skills',
    'fullstack': 'Balance both frontend and backend skills for versatility',
    'devops': 'Emphasize automation, monitoring, and cloud infrastructure',
    'data-science': 'Develop statistical analysis and machine learning expertise'
  };
  
  return `🎯 Role focus: ${advice[roleType]}`;
}

module.exports = {
  extractSkillsFromText,
  analyzeSkillMatch,
  analyzeExperienceLevel,
  detectRoleType,
};