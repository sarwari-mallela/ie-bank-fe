# IE Bank Frontend Application Security
# THREAT MODELLING ANALYSIS FOLLOWING THE PASTA MODEL. 

## Introduction to PASTA
PASTA (Process for Attack Simulation and Threat Analysis) stands as a comprehensive, risk-centric methodology that has revolutionized the landscape of cybersecurity. 
Comprising seven meticulously designed stages, PASTA provides organizations with a structured and systematic approach to identify, assess, 
and quantify the multifaceted risks that lurk within software applications and complex systems.

## Table of Contents
- [Stage 1: Define the Objectives](#stage-1)
- [Stage 2: Define the Technical Scope](#stage-2)
- [Stage 3: Decompose the Application](#stage-3)
- [Stage 4: Threat Analysis](#stage-4)
- [Stage 5: Vulnerability Analysis](#stage-5)
- [Stage 6: Attack Modeling](#stage-6)
- [Stage 7: Risk and Impact Analysis](#stage-7)

## stage 1
**What's needed in this stage:**
- Define the business objectives of the application or program.
- Define the security and compliance requirements.
- Define business impact.
- Define the risk profile.

**The business objectives:**
For the IE Bank frontend application, the business objectives focus on enabling secure online banking experiences, including user-friendly interfaces for account management, transaction processing, and customer service. 
Security objectives prioritize data protection, regulatory compliance, and ensuring continuous availability of services. 
Compliance with financial industry standards and data protection laws is crucial. 
The risk profile should account for the sensitivity of financial data and the potential impact of data breaches or service interruptions.

**The security and compliance requirements**
Would involve adhering to financial regulations such as GDPR for European customers, PCI DSS for payment security, and any local financial service authority regulations. 
The security framework must be robust, incorporating industry best practices such as this one SAFECode for data protection and cyber security.

**Business impact**
Involves maintaining the reputation of IE Bank, ensuring customer trust, and minimizing any financial losses due to security incidents.

**The risk profile** 
Would consider the potential for data breaches, fraud, service downtime, and their impact on business operations and customer trust.

## stage 2 
What's needed in this stage:
- Enumerate software components
- Identify actors & data sinks/sources
  
**Enumerate software components:**
The IE Bank frontend application encompasses a stack that includes:
- Cloud hosting platform, Azure webservices. 
- Web application architecture, divided into a front-end using Vue.js, and a backend possibly using bicep python. 
- Databases for user data, transactions, and logs, which could include SQL Alquemy and Flask frameworks.
- IaaS, such as containerized services Docker, running on hardened operating systems and backed by secure network configurations.

**Identify actors & data sinks/sources:**
Actors:
- End-users accessing the banking services through various platforms.
- IT support staff responsible for application maintenance and updates.
- System administrators for backend infrastructure and cloud services.

**Data sinks/sources:**
- Banking transaction databases, potentially including user data, transaction histories, banking management.
- External APIs for credit checks, identity verification, and other banking-related services.
- Log management systems for monitoring and alerting on security incidents.

## stage 3 
What's needed in this stage:
- Enumerate all application use cases.
- Security functional analysis and use of trust boundaries.

  
**Application use cases:**
The primary use case of the IE Bank frontend application is to provide a secure, user-friendly online banking platform login page that enables customers to manage their financial activities. 

**This includes:**
- Customer:
  - Authenticate and manage personal account details.
  - View account balances, transaction history, and statements.
  - View account status and balance.
  - View country location of the account.

- Company employees:
  - Manage and verify user account creation and closure.
  - Monitor transactions for fraudulent activities.
  - Provide customer support. 
  - Manage backend systems for operational continuity.

**Tracking usage:**
- Ensure all customer interactions with the application are logged securely for auditing and regulatory compliance.
- Monitor application performance and user engagement for improvements.

## stage 4 
**What’s needed in this stage:**
- Analyze the overall threat scenario
- Gather threat intelligence from internal sources
- Gather threat intelligence from external sources
Provide a high-level overview of potential threats, along with key information per threat.

**Threat Analysis Table**

| Application Component   | Potential Threats                               |
|------------------------|-------------------------------------------------|
| User Authentication    | Brute force attacks, Phishing, Session hijacking |
| Transaction Processing | SQL Injection, Cross-Site Scripting (XSS)        |
| User Interface         | Clickjacking, Client-side code manipulation       |
| API Endpoints          | Unauthorized access, Data leakage               |
| Data Storage           | Data breaches, Insecure data transmission       |

**Gather threat intelligence from internal sources**

| Security Incident                                | Learnings                                         | Covered by Countermeasures / Security Requirements?                                                                                                                      |
|--------------------------------------------------|---------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Incident A: Unauthorized data access by employee | A) Employee access levels must be strictly controlled and monitored. B) Access to sensitive data should be logged and auditable. | A) Yes, by security policy #401 - User Access Control and Monitoring. B) Yes, by implementing detailed access logs as per security policy #402.                           |
| Incident B: SQL Injection attack detected         | A) Input validation and parameterized queries are essential. B) Regular code reviews and vulnerability scans to prevent such attacks. | A) Yes, by implementing OWASP best practices in development as per security policy #403. B) Yes, by ongoing security training and automated code scanning as per security policy #404. |
| Incident C: Cross-Site Scripting (XSS) attack     | A) Need for sanitizing user input and output encoding. B) Content Security Policy (CSP) headers should be implemented to prevent XSS. | A) Yes, addressed by input sanitation measures as per security policy #405. B) Yes, CSP headers are in place as per security policy #406.                           |

**Gather threat intelligence from external sources**
Identifying common web application threats from the CAPEC (Common Attack Pattern Enumeration and Classification) list. 

CAPEC is a standardized framework for describing common attack patterns, tactics, and techniques used by cybercriminals and hackers. 
It provides a structured and organized way to document and categorize the various methods attackers use to exploit vulnerabilities in software, hardware, and network systems.

| CAPEC-ID  | CAPEC Description                        | Applicable                                                |
| --------- | --------------------------------------- | --------------------------------------------------------- |
| CAPEC-63  | Cross-Site Scripting (XSS)              | Yes - Frontend applications are often susceptible to XSS attacks. |
| CAPEC-62  | Cross-Site Request Forgery (CSRF)        | Yes - If state-changing operations are not properly protected, CSRF can be a concern. |
| CAPEC-A10 | Unvalidated Redirects and Forwards      | Yes - Without proper validation, attackers can redirect users to phishing or malware sites. |

*XSS* : Cross-Site Scripting (XSS) attacks are a type of injection, in which malicious scripts are injected into otherwise benign and trusted websites. 
XSS attacks occur when an attacker uses a web application to send malicious code, generally in the form of a browser side script, to a different end user. 

*CSRF* : Cross-Site Request Forgery (CSRF) is an attack that forces an end user to execute unwanted actions on a web application in which they’re currently authenticated. 
With a little help of social engineering (such as sending a link via email or chat), an attacker may trick the users of a web application into executing actions of the attacker’s choosing. 
If the victim is a normal user, a successful CSRF attack can force the user to perform state changing requests like transferring funds, changing their email address, and so forth. 
If the victim is an administrative account, CSRF can compromise the entire web application.

## stage 5 
**What's needed in this stage:**

- Review and correlate existing vulnerability data.
- Identify weak design patterns in the architecture.
- Map threats to vulnerabilities.
- Provide contextual risk analysis based on threat-vulnerability.
- Conduct targeted vulnerability testing.

**Review and correlate existing vulnerability data:**
For IE Bank's frontend application, review historical incident reports to identify any recurring vulnerabilities, particularly focusing on any past issues with third-party libraries or frameworks.
Assess the effectiveness of existing network segmentation, especially if it includes legacy systems known for update and patch management issues.

**Identify weak design patterns in the architecture:**
Analyze the application's DFD to locate design patterns that may contribute to security weaknesses, such as insufficient input validation or lack of encryption in data storage and transmission.
Evaluate the application's dependency on external systems, as these may pose a risk if they are compromised.

**Map threats to vulnerabilities:**
Pair identified vulnerabilities from the architecture review with potential threat actors and their methods, such as CSRF, XSS, or SQL injection.
Prioritize the mapping based on the data's sensitivity and the system's exposure to the threat.

**Provide contextual risk analysis based on threat-vulnerability:**
For each mapped threat-vulnerability pair, evaluate the potential impact on the application and the business as a whole, considering factors like financial loss, reputational damage, and regulatory non-compliance.
Develop a risk score or level to prioritize mitigation efforts, focusing first on high-impact and high-likelihood vulnerabilities.

**Conduct targeted vulnerability testing:**
Implement a testing plan that focuses on the most critical vulnerabilities identified in the risk analysis, using both automated tools and manual penetration testing techniques.
Ensure that the testing plan covers new code, with a particular focus on changes made in response to identified weaknesses.

## stage 6 
**Analyze possible attack scenarios**

| Threat Scenario                             | Vulnerabilities                  | Potential Attack Methods               |
| ------------------------------------------ | -------------------------------- | ------------------------------------- |
| Brute force attack on user authentication   | Weak password policies           | Automated password guessing            |
| SQL Injection in transaction processing     | Insecure query handling          | Injecting malicious SQL queries        |
| XSS in User Interface                      | Lack of input validation         | Embedding scripts in user inputs       |
| Unauthorized access to API Endpoints        | Inadequate access controls       | Accessing APIs with stolen credentials |
| Data breach in Data Storage                 | Unencrypted data storage         | Accessing unsecured data at rest       |


## stage 7 
**What's needed in this stage:**

- Calculate the risk of each threat.
- Identify the countermeasures.
- Calculate the residual risks.
- Recommend a strategy to manage risks.

**Calculate the risk of each threat:**
For the IE Bank frontend application, we have analyzed various threats and have assigned a risk level based on their likelihood and potential impact. 
For example, the risk of cross-site scripting (XSS) is identified as MEDIUM likelihood due to robust input validation, but the impact is HIGH because of the potential to affect many users, leading to an overall HIGH risk rating.

**Identify the countermeasures:**
For each threat, like XSS, the countermeasures include implementing content security policy headers, regularly updating libraries to mitigate known vulnerabilities, and conducting thorough code reviews to identify any instances of unsafe code handling.

**Calculate the residual risks:**
After applying the countermeasures, the residual risk for XSS is reduced. However, it is not completely eliminated because of the evolving nature of threat vectors. Therefore, we consider the residual risk to be MEDIUM, which requires ongoing attention and periodic reassessment.

**Recommend a strategy to manage risks:**
To manage these risks effectively, I propose the following strategies:

- Conducting periodic security audits and pen tests to evaluate the effectiveness of the countermeasures.
- Implementing an incident response plan to quickly address any breaches should they occur.
- Establishing a routine for updating and patching all software components in the application stack.
- Training staff on security best practices and raising awareness about the importance of security in the development lifecycle.
- Reviewing and updating the risk assessment at least bi-annually or after any significant changes to the application or its environment.
  
