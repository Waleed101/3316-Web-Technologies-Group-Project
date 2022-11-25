import { React, useState } from 'react';
import { useCookies } from 'react-cookie';
import { BrowserRouter, Route, Link } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    FormLabel,
    Input,
    Stack,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Textarea,
    Switch,
    Text,
    Heading,
    InputGroup
  } from '@chakra-ui/react'

let url = require("../setup/api.setup.js")


function Policies() {

    return (
     <>
     <Heading>
      Security Policy
     </Heading>
     <Text>
     1.	Overview
Web application vulnerabilities account for the largest portion of attack vectors outside of malware.   It is crucial that any web application be assessed for vulnerabilities and any vulnerabilities be remediated prior to production deployment.

2.	Purpose
The purpose of this policy is to define web application security assessments within the website. Web application assessments are performed to identify potential or realized weaknesses as a result of inadvertent mis-configuration, weak authentication, insufficient error handling, sensitive information leakage, etc.  Discovery and subsequent mitigation of these issues will limit the attack surface of the website services available both internally and externally as well as satisfy compliance with any relevant policies in place.

3.	Scope
This policy covers all web application security assessments requested by any individual, group or department for the purposes of maintaining the security posture, compliance, risk management, and change control of technologies in use at the website.

All web application security assessments will be performed by delegated security personnel either employed or contracted by the website.   All findings are considered confidential and are to be distributed to persons on a “need to know” basis.  Distribution of any findings outside of the website is strictly prohibited unless approved by the Chief Information Officer.

Any relationships within multi-tiered applications found during the scoping phase will be included in the assessment unless explicitly limited.  Limitations and subsequent justification will be documented prior to the start of the assessment.

4.	Policy

4.1 Web applications are subject to security assessments based on the following criteria:

4.1.1 New or Major Application Release will be subject to a full assessment prior to approval of the change control documentation and/or release into the live environment.
4.1.2 Third Party or Acquired Web Application will be subject to full assessment after which it will be bound to policy requirements.
4.1.3 Point Releases will be subject to an appropriate assessment level based on the risk of the changes in the application functionality and/or architecture.
4.1.4 Patch Releases will be subject to an appropriate assessment level based on the risk of the changes to the application functionality and/or architecture.
4.1.5 Emergency Releases An emergency release will be allowed to forgo security assessments and carry the assumed risk until such time that a proper assessment can be carried out.  Emergency releases will be designated as such by the Chief Information Officer or an appropriate manager who has been delegated this authority.
4.1.6 Annual Review all applications will be subject to a full annual review in its entirety to review potential risks of functionality and/or architecture. 

4.2 All security issues that are discovered during assessments must be mitigated based upon the following risk levels. The Risk Levels are based on the OWASP Risk Rating Methodology. Remediation validation testing will be required to validate fix and/or mitigation strategies for any discovered issues of Medium risk level or greater.

4.2.1 High Any high-risk issue must be fixed immediately or other mitigation strategies must be put in place to limit exposure before deployment.  Applications with high risk issues are subject to being taken off-line or denied release into the live environment.
4.2.2 Medium Medium risk issues should be reviewed to determine what is required to mitigate and scheduled accordingly.  Applications with medium risk issues may be taken off-line or denied release into the live environment based on the number of issues and if multiple issues increase the risk to an unacceptable level.  Issues should be fixed in a patch/point release unless other mitigation strategies will limit exposure.
4.2.3 Low Issue should be reviewed to determine what is required to correct the issue and scheduled accordingly.

4.3 The following security assessment levels shall be established by the InfoSec organization or other designated organization that will be performing the assessments. 
4.3.1 Full A full assessment is comprised of tests for all known web application vulnerabilities using both automated and manual tools based on the OWASP Testing Guide.  A full assessment will use manual penetration testing techniques to validate discovered vulnerabilities to determine the overall risk of any and all discovered.
4.3.2 Quick A quick assessment will consist of a typically automated scan of an application for the OWASP Top Ten web application security risks at a minimum.
4.3.3 Targeted A targeted assessment is performed to verify vulnerability remediation changes or new application functionality.

4.4 The current approved web application security assessment tools in use which will be used for testing are:

Other tools and/or techniques may be used depending upon what is found in the default assessment and the need to determine validity and risk are subject to the discretion of the Security Engineering team.

5.	Policy Compliance

5.1	Compliance Measurement
The Infosec team will verify compliance to this policy through various methods, including but not limited to, business tool reports, internal and external audits, and feedback to the policy owner. 
5.2	Exceptions
Any exception to the policy must be approved by the Infosec team in advance. 
5.3	Non-Compliance
An employee found to have violated this policy may be subject to disciplinary action, up to and including termination of employment. 
Web application assessments are a requirement of the change control process and are required to adhere to this policy unless found to be exempt.   All application releases must pass through the change control process.  Any web applications that do not adhere to this policy may be taken offline until such time that a formal assessment can be performed at the discretion of the Chief Information Officer.
     </Text>

     <Heading>
      Acceptable Use Policy
     </Heading>
     <Text>
     1.	Overview
Infosec Team’s intentions for publishing an Acceptable Use Policy are not to impose restrictions that are contrary to the website’s established culture of openness, trust and integrity. the website is committed to protecting the website's employees, partners and the company from illegal or damaging actions by individuals, either knowingly or unknowingly.
Internet/Intranet/Extranet-related systems, including but not limited to computer equipment, mobile devices, software, operating systems, storage media, network accounts providing electronic mail, WWW browsing, and FTP, are the property of the website. These systems are to be used for business purposes in serving the interests of the company, and of our clients and customers during normal operations. Please review Human Resources policies for further details.
Effective security is a team effort involving the participation and support of every the website employee and affiliate who deals with information and/or information systems. It is the responsibility of every computer user to know these guidelines, and to conduct their activities accordingly.
2.	Purpose
The purpose of this policy is to outline the acceptable use of computer equipment and other electronic devices at the website. These rules are in place to protect the employee and the website. Inappropriate use exposes the website to cyber risks including virus attacks including ransomware, compromise of network systems and services, data breach, and legal issues. 
3.	Scope
This policy applies to the use of information, electronic and computing devices, and network resources to conduct the website business or interact with internal networks and business systems, whether owned or leased by the website, the employee, or a third party. All employees, contractors, consultants, temporary, and other workers at the website and its subsidiaries are responsible for exercising good judgment regarding appropriate use of information, electronic devices, and network resources in accordance with the website policies and standards, and local laws and regulation. Exceptions to this policy are documented in section 5.2
This policy applies to employees, contractors, consultants, temporaries, and other workers at the website, including all personnel affiliated with third parties. This policy applies to all equipment that is owned or leased by the website. 
4.	Policy

4.1	General Use and Ownership 

4.1.1	the website proprietary information stored on electronic and computing devices whether owned or leased by the website, the employee or a third party, remains the sole property of the website.  You must ensure through legal or technical means that proprietary information is protected in accordance with the Data Protection Standard.
4.1.2	You have a responsibility to promptly report the theft, loss, or unauthorized disclosure of the website proprietary information.
4.1.3	You may access, use or share the website proprietary information only to the extent it is authorized and necessary to fulfill your assigned job duties.
4.1.4	Employees are responsible for exercising good judgment regarding the reasonableness of personal use. Individual departments are responsible for creating guidelines concerning personal use of Internet/Intranet/Extranet systems. In the absence of such policies, employees should be guided by departmental policies on personal use, and if there is any uncertainty, employees should consult their supervisor or manager. 
4.1.5	For security and network maintenance purposes, authorized individuals within the website may monitor equipment, systems, and network traffic at any time, per Infosec's Audit Policy. 
4.1.6	the website reserves the right to audit networks and systems on a periodic basis to ensure compliance with this policy. 

4.2	Security and Proprietary Information

4.2.1	All mobile and computing devices that connect to the internal network must comply with the Minimum Access Policy.
4.2.2	System level and user level passwords must comply with the Password Policy. Providing access to another individual, either deliberately or through failure to secure its access, is prohibited.
4.2.3	All computing devices must be secured with a password-protected lock screen with the automatic activation feature set to 10 minutes or less. You must lock the screen or log off when the device is unattended. 
4.2.4	Postings by employees from a the website email address to newsgroups or other online platforms, should contain a disclaimer stating that the opinions expressed are strictly their own and not necessarily those of the website, unless posting is during business duties. 
4.2.5	Employees must use extreme caution when opening email attachments received from unknown senders, which may contain malware.

4.3	Unacceptable Use

The following activities are, in general, prohibited. Employees may be exempted from these restrictions during their legitimate job responsibilities (e.g., systems administration staff may have a need to disable the network access of a host if that host is disrupting production services).

Under no circumstances is an employee of the website authorized to engage in any activity that is illegal under local, state, federal or international law while utilizing the website-owned resources. 

The lists below are by no means exhaustive but attempt to provide a framework for activities which fall into the category of unacceptable use. 

4.3.1	System and Network Activities 

The following activities are strictly prohibited, with no exceptions: 
1.	Violations of the rights of any person or company protected by copyright, trade secret, patent or other intellectual property, or similar laws or regulations, including, but not limited to, the installation or distribution of "pirated" or other software products that are not appropriately licensed for use by the website. 
2.	Unauthorized copying of copyrighted material including, but not limited to, digitization and distribution of photographs from magazines, books or other copyrighted sources, copyrighted music, and the installation of any copyrighted software for which the website or the end user does not have an active license is strictly prohibited. 
3.	Accessing data, a server, or an account for any purpose other than conducting the website business, even if you have authorized access, is prohibited.
4.	Exporting software, technical information, encryption software or technology, in violation of international or regional export control laws, is illegal. The appropriate management should be consulted prior to export of any material that is in question. 
5.	Introduction of malicious programs into the network or server.
6.	Revealing your account password/passphrase to others or allowing use of your account by others. This includes family and other household members when work is being done at home. 
7.	Using a the website computing asset to actively engage in procuring or transmitting material that is in violation of sexual harassment or hostile workplace laws in the user's local jurisdiction. 
8.	Making fraudulent offers of products, items, or services originating from any the website account. 
9.	Making statements about warranty, expressly or implied, unless it is a part of normal job duties. 
10.	Effecting security breaches or disruptions of network communication. Security breaches include, but are not limited to, accessing data of which the employee is not an intended recipient or logging into a server or account that the employee is not expressly authorized to access, unless these duties are within the scope of regular duties. For purposes of this section, "disruption" includes, but is not limited to, network sniffing, ping floods, packet spoofing, denial of service, brute-forcing accounts, and forged routing information for malicious purposes. 
11.	Port scanning or security scanning is expressly prohibited unless prior notification to the Infosec Team is made. 
12.	Executing any form of network monitoring which will intercept data not intended for the employee's host, unless this activity is a part of the employee's normal job/duty. 
13.	Circumventing user authentication or security of any host, network, or account. 
14.	Introducing honeypots, honeynets, or similar technology on the the website network. 
15.	Interfering with or denying service to any user other than the employee's host (for example, denial of service attack). 
16.	Using any program/script/command, or sending messages of any kind, with the intent to interfere with, or disable, a user's terminal session, via any means, locally or via the Internet/Intranet/Extranet. 
17.	Providing information about, or lists of, the website employees to parties outside the website. 

4.3.2	Email and Communication Activities

When using company resources to access and use the Internet, users must realize they represent the company. Whenever employees state an affiliation to the company, they must also clearly indicate that "the opinions expressed are my own and not necessarily those of the company". Questions may be addressed to the IT Department
1.	Sending unsolicited email messages, including the sending of "junk mail" or other advertising material to individuals who did not specifically request such material (email spam). 
2.	Any form of harassment via email, telephone, text, or paging, whether through language, frequency, or size of messages. 
3.	Unauthorized use, or forging, of email header information. 
4.	Solicitation of email for any other email address, other than that of the poster's account, with the intent to harass or to collect replies. 
5.	Creating or forwarding "chain letters", "Ponzi" or other "pyramid" schemes of any type. 
6.	Use of unsolicited email originating from within the website's networks of other Internet/Intranet/Extranet service providers on behalf of, or to advertise, any service hosted by the website or connected via the website's network. 
7.	Posting the same or similar non-business-related messages to large numbers of Usenet newsgroups (newsgroup spam). 

4.3.3	Blogging and Social Media

1.	Blogging or posting to social media platforms by employees, whether using the website’s property and systems or personal computer systems, is also subject to the terms and restrictions set forth in this Policy. Limited and occasional use of the website’s systems to engage in blogging or other online posting is acceptable, provided that it is done in a professional and responsible manner, does not otherwise violate the website’s policy, is not detrimental to the website’s best interests, and does not interfere with an employee's regular work duties. Blogging or other online posting from the website’s systems is also subject to monitoring.
2.	the website’s Confidential Information policy also applies to blogging. As such, Employees are prohibited from revealing any website confidential or proprietary information, trade secrets or any other material covered by the website’s Confidential Information policy when engaged in blogging.
3.	Employees shall not engage in any blogging that may harm or tarnish the image, reputation and/or goodwill of the website and/or any of its employees. Employees are also prohibited from making any discriminatory, disparaging, defamatory or harassing comments when blogging or otherwise engaging in any conduct prohibited by the website’s Non-Discrimination and Anti-Harassment policy.
4.	Employees may also not attribute personal statements, opinions or beliefs to the website when engaged in blogging. If an employee is expressing his or her beliefs and/or opinions in blogs, the employee may not, expressly, or implicitly, represent themselves as an employee or representative of the website. Employees assume any and all risk associated with blogging.
5.	Apart from following all laws pertaining to the handling and disclosure of copyrighted or export-controlled materials, the website’s trademarks, logos and any other the website intellectual property may also not be used in connection with any blogging or social media activity
5.	Policy Compliance

5.1	Compliance Measurement
The Infosec Team will verify compliance to this policy through various methods, including but not limited to, business tool reports, internal and external audits, and feedback to the policy owner. 
5.2	Exceptions
Any exception to the policy must be approved by the Infosec team in advance. 
5.3	Non-Compliance
An employee found to have violated this policy may be subject to disciplinary action, up to and including termination of employment. 

6.	Related Standards, Policies and Processes
•	Data Classification Policy
•	Data Protection Standard
•	Social Media Policy
•	Minimum Access Policy
•	Password Policy

7.	Definitions and Terms
The following definition and terms can be found in the SANS Glossary located at:
https://www.sans.org/security-resources/glossary-of-terms/

•	Blogging
•	Honeypot
•	Honeynet
•	Proprietary Information 
•	Spam
•	Ransomware

     </Text>
     </> 
    )
    
}
export default Policies;