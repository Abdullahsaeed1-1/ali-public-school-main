/**
 * The school's nine published policies, in full.
 *
 * Transcribed from `APSCONTENTREFERENCE.md` sections 4.1, 4.3–4.7 and 4.9–4.11,
 * which are themselves a verbatim capture of the legacy site. MASTERPROMPT §4
 * is explicit that these must not be summarised: they are what a serious parent
 * reads before enrolling, and they are the proof the school is properly run.
 *
 * Light edits made, and only these:
 *   - obvious typos on the live site corrected where the meaning is unambiguous
 *   - "Howework" → "Homework", "Unifrom" → "Uniform" in titles
 *   - British punctuation normalised
 * No sentence has been rewritten, shortened or added to.
 */

export type PolicyBlock =
  | { kind: "para"; text: string }
  | { kind: "heading"; text: string }
  | { kind: "list"; items: string[]; ordered?: boolean }
  | { kind: "table"; head: string[]; rows: string[][] };

export interface Policy {
  slug: string;
  title: string;
  /** One line for the accordion summary — ours, describing the policy, not part of it. */
  summary: string;
  blocks: PolicyBlock[];
}

export const policies: Policy[] = [
  // ------------------------------------------------------------ 4.1
  {
    slug: "school-rules",
    title: "School Rules",
    summary: "What we expect of every child, every day.",
    blocks: [
      {
        kind: "para",
        text: "At Ali Public School, children respect each other as individuals, respect each other's property, and respect the School's facilities. They are a credit to the School at all times.",
      },
      {
        kind: "list",
        ordered: true,
        items: [
          "Ali Public School children show kindness and support others.",
          "Ali Public School children do not steal or vandalise others' property.",
          "Ali Public School children do not smoke or involve themselves with illegal drugs.",
          "At Ali Public School bullying is unacceptable in any form.",
          "No Ali Public School child may leave the school premises unless accompanied by a teacher or other member of staff or a parent/guardian.",
          "Movement around the School and between lessons should be orderly and considerate to others.",
          "Uniform, dress and appearance: Children should wear full school uniform smartly and according to the lists issued by the school office. Children should always wear the type of shoes specified in the uniform lists for boys and girls. Children's hair should be neat. Children should not wear jewellery of any type with school uniform unless given permission by the Head. Children should not wear make-up or nail polish, except as permitted in Annual Day functions.",
          "The School cannot accept responsibility for any child's personal valuable items, and these should not be brought into the School.",
          "Ali Public School children attend punctually every day during term-time and any absence for whatever reason must be reported promptly to the school office.",
        ],
      },
    ],
  },

  // ------------------------------------------------------------ 4.3
  {
    slug: "attendance",
    title: "Student Attendance Policy",
    summary: "Why we expect every child in every day, and how to tell us when they cannot be.",
    blocks: [
      {
        kind: "para",
        text: "The management and staff of Ali Public School believe that it is vitally important that students attend school at all times.",
      },
      {
        kind: "para",
        text: "We are committed to providing a full and effective educational experience for all of our students and believe that attending every session contributes significantly to students making consistent progress in their school work. We therefore expect good attendance and punctuality from all of our students in order for them to make the most of the opportunities that the school has to offer.",
      },
      { kind: "heading", text: "Lateness" },
      {
        kind: "para",
        text: "Parents and carers should ensure that children are in the school in time for the Assembly. We are obliged to record lateness in the class register. There are of course good reasons for occasional lateness, and we hope that we are able to deal with these situations with sympathy and understanding.",
      },
      { kind: "heading", text: "Sickness" },
      {
        kind: "para",
        text: "Children who are unwell are best cared for at home. If your child will not be attending school, please inform us by telephone before school starts or write us a leave absent request. If you fail to do this we will contact you to make sure that nothing has happened to your child on the way to school.",
      },
      { kind: "heading", text: "Educational activities" },
      {
        kind: "para",
        text: "We are able to authorise absence for educational activities such as auditions or sporting events etc. Please let us know in advance that your child will be absent.",
      },
      { kind: "heading", text: "Appointments" },
      {
        kind: "para",
        text: "Parents should make every effort to ensure that routine appointments are in holiday time whenever possible. However, we do appreciate that this is not always manageable, particularly with hospital and orthodontic appointments. Please inform us in advance of any absences for this reason. If you need to collect your child early, please let us know.",
      },
      { kind: "heading", text: "Requests for Leave of Absence" },
      {
        kind: "para",
        text: "Parents who request leave for their son or daughter during term time must do so in advance by completing and returning a 'Leave of Absence Request' form, available from the school office.",
      },
      {
        kind: "para",
        text: "Leave of absence should be requested at least two weeks in advance. The parent will be advised of the school's decision in writing. Prolonged periods of reported illness within two weeks of a school holiday will automatically require medical evidence. If attendance or punctuality is a concern, parents will be contacted and further action may be taken.",
      },
    ],
  },

  // ------------------------------------------------------------ 4.4
  {
    slug: "homework",
    title: "Homework Policy",
    summary: "What is set, and on which day, for every class group.",
    blocks: [
      {
        kind: "para",
        text: "Children benefit from homework activities and we expect all children to do some additional work at home. The type of activity and amount of time spent depends upon the age of the child. We expect every child to read regularly at home either independently or with an adult. Other activities include learning spellings, carrying out a specific task to prepare for a lesson during the week. We have a detailed policy for homework, which is detailed below and subject to change without prior notice.",
      },
      { kind: "heading", text: "Nursery & K.G." },
      {
        kind: "table",
        head: ["Day", "Homework"],
        rows: [
          ["Monday", "English (written), Urdu (written), Maths (oral)"],
          ["Tuesday", "Maths (written), English (written), Urdu (oral)"],
          ["Wednesday", "Urdu (written), Maths (written), English (oral)"],
          ["Thursday", "English (written), Urdu (written), Science (oral)"],
          ["Friday", "English (written), Urdu (written), Maths (oral)"],
          ["Saturday", "Maths (written), English (written), IQ (oral)"],
        ],
      },
      { kind: "heading", text: "Class 1, 2 & 3" },
      {
        kind: "table",
        head: ["Day", "Homework"],
        rows: [
          ["Monday", "Islamiyat (written), Maths (written), English (oral)"],
          ["Tuesday", "Science (written), English (written), Maths (oral)"],
          ["Wednesday", "Urdu (written), Islamiyat (written), Science (oral)"],
          ["Thursday", "Maths (written), Urdu (written), Islamiyat (oral)"],
          ["Friday", "English (written), Islamiyat (written), Urdu (oral)"],
          ["Saturday", "Maths (written), Science (written), English (oral)"],
        ],
      },
      { kind: "heading", text: "Class 4 – 8" },
      {
        kind: "table",
        head: ["Day", "Homework"],
        rows: [
          ["Monday", "English, Maths, Islamiyat"],
          ["Tuesday", "Urdu, Science, Social Studies/Geography"],
          ["Wednesday", "English, Maths, Islamiyat"],
          ["Thursday", "Urdu, Science, Social Studies/Geography"],
          ["Friday", "English, Maths"],
          ["Saturday", "No homework assignment"],
        ],
      },
      { kind: "heading", text: "Class 9 – 10" },
      {
        kind: "table",
        head: ["Day", "Homework"],
        rows: [
          ["Monday", "Physics, Biology, Chemistry"],
          ["Tuesday", "English, Maths, Urdu"],
          ["Wednesday", "Social Studies, Physics, Islamiyat"],
          ["Thursday", "Biology, English, Maths"],
          ["Friday", "Chemistry, Physics, Urdu"],
          ["Saturday", "Maths, Social Studies, Islamiyat"],
        ],
      },
    ],
  },

  // ------------------------------------------------------------ 4.5
  {
    slug: "behaviour",
    title: "Behaviour, Discipline & Exclusions",
    summary:
      "How good behaviour is encouraged, how poor behaviour is answered, and the circumstances in which a child may be excluded.",
    blocks: [
      {
        kind: "para",
        text: "Ali Public School is committed to safeguarding and promoting the welfare of children and young people, along with their protection and expects all staff and management to share this commitment.",
      },
      { kind: "heading", text: "General Policy" },
      {
        kind: "para",
        text: "The principal aim of the school is to educate each child academically, personally and socially. The smooth running of the school and the capacity of the children to function effectively in society depends upon them developing good behaviour patterns. However, good behaviour is essentially a reflection of more fundamental attitudes such as honesty, kindness, politeness and consideration for others. In short:",
      },
      {
        kind: "list",
        items: [
          "Respect for self",
          "Respect for others",
          "Respect for property",
          "Respect the law",
        ],
      },
      {
        kind: "para",
        text: "To have the greatest effect, a discipline system needs to focus on the creation and maintenance of an atmosphere of respect rather than emphasising poor behaviour and punishments. In such an environment good behaviour will predominate and there will be less need to impose sanctions.",
      },
      {
        kind: "para",
        text: "On the assumption that children will only learn respect if they first experience respect themselves, the onus lies with all school staff to demonstrate respect for the children by being kind, fair, firm, consistent, interested, patient and by taking time to care for them.",
      },
      { kind: "heading", text: "Management of Behaviour" },
      {
        kind: "para",
        text: "The management of behaviour is the responsibility of the Principal and Headmistress and of all members of staff (teaching and non-teaching) throughout the school. Implementation of this policy will be overseen by the Departmental Heads to whom members of staff may refer for support, guidance or assistance, whilst the Head remains in overall control of all matters of behaviour.",
      },
      {
        kind: "para",
        text: "Any serious injury resulting from a child's behaviour, accident or injury will be notified to parents on the same day it occurs.",
      },
      { kind: "heading", text: "Focus" },
      {
        kind: "para",
        text: "The first priority for all staff is to focus attention on good behaviour, which should be enhanced as much as possible by reinforcing it through:",
      },
      {
        kind: "list",
        items: ["Verbal praise and encouragement", "An award (trophy, stickers etc.)"],
      },
      {
        kind: "para",
        text: "An award should be given for any act that demonstrates above normal thoughtfulness or consideration.",
      },
      {
        kind: "para",
        text: "Staff is encouraged to praise good behaviour and work with the children. Progress is tracked in whole school and departmental staff meetings.",
      },
      { kind: "heading", text: "Support" },
      {
        kind: "para",
        text: "The Heads of Department will support all members of staff in dealing with poor behaviour. Children may be sent to the Head of Department first and then the Principal or Headmistress; it is preferable to exercise this option for more serious, or persistent, offences.",
      },
      { kind: "heading", text: "Responses to Poor Behaviour" },
      {
        kind: "para",
        text: "We specifically prohibit the use of physical punishment. However we do have a code of conduct for staff which covers any instances where physical restraint may be required.",
      },
      { kind: "heading", text: "Initial Responses" },
      {
        kind: "para",
        text: "Given a generally constructive environment, and a basically good relationship between adult and child, staff should deal with minor infringements themselves. It is important when doing so to be clear, firm and consistent. Often a simple reprimand or reminder will suffice but, if not, an escalating system tends to be the most effective.",
      },
      { kind: "heading", text: "Escalation" },
      {
        kind: "para",
        text: "A simple escalation system might operate as follows:",
      },
      {
        kind: "list",
        ordered: true,
        items: [
          "State clearly what you want the child to do or not to do (avoid arguing the point).",
          "Repeat the demand more firmly, if necessary, perhaps informing of a consequence to non-compliance.",
          "The consequence should be issued with a third demand, if one has not already been given.",
          "The consequence should be carried out if the child continues to misbehave.",
        ],
      },
      {
        kind: "para",
        text: "No further warnings should be given, as they would reduce the effectiveness of future demands. Children need to know that staff mean what they say.",
      },
      { kind: "heading", text: "Parental Involvement" },
      {
        kind: "para",
        text: "Parents are approached about persistent behavioural problems at school or more serious incidents in a confidential manner. Parents may be involved in the remedial programme.",
      },
      { kind: "heading", text: "Extra Work" },
      {
        kind: "para",
        text: "Extra work should only be given for poor or incomplete work, not for poor behaviour unless this has caused work not to be done properly.",
      },
      { kind: "heading", text: "Reprimands" },
      {
        kind: "para",
        text: "When reprimanding a child it is important to focus attention directly on that particular behaviour. Derogatory comments should not be made about the child in general. Sarcasm and derision tend to be destructive rather than constructive. The aim is for the child to feel shame about the behaviour, not about themselves.",
      },
      {
        kind: "para",
        text: "The Principal and Headmistress stand as the ultimate authority for very serious, or unresponsive, cases. Staff may refer children directly to the Principal or Headmistress, or they may be passed on by Departmental Heads should this be appropriate.",
      },
      { kind: "heading", text: "Lapses" },
      {
        kind: "para",
        text: "It is inevitable that there will be times when individuals behave in an undesirable manner. There are three basic reasons why children fail to comply with a desired behaviour:",
      },
      { kind: "list", items: ["Ignorance", "Forgetfulness", "Intent"] },
      {
        kind: "para",
        text: "It is important to differentiate between them, as the remedies will be different in each case.",
      },
      {
        kind: "para",
        text: "Ignorance — the child needs to be informed that their behaviour is undesirable and also have the reason explained to them.",
      },
      {
        kind: "para",
        text: "Forgetfulness — children do not always learn immediately, so it may be necessary for them to be reminded occasionally of the behaviour that is required. The borderline between this reason and the next is not always clear.",
      },
      {
        kind: "para",
        text: "Intent — when a child deliberately behaves in an undesirable manner, the aim is to modify the particular behaviour of the individual child. Whilst it is important to be fair, the remedy in these cases will depend upon several factors, all of which need to be considered:",
      },
      {
        kind: "list",
        items: [
          "The nature and severity of the misdemeanour",
          "The age of the child",
          "The frequency of related errors",
          "The personality of the child",
          "The circumstances surrounding the incident",
          "The relationship between the staff and the child",
        ],
      },
      { kind: "heading", text: "Staff Contribution" },
      {
        kind: "para",
        text: "Whilst children can, and should, be held accountable for their actions, staff should always ask themselves what, if any, was their contribution, or lack of it, to the situation.",
      },
      { kind: "heading", text: "Attention Seeking" },
      {
        kind: "para",
        text: "Distracting behaviour sometimes stems from a desire for attention on the part of the child. In such circumstances, the poor behaviour should be dealt with firmly with as little attention as possible being given at this time. However, this should be compensated by personal attention being offered at other times, both as a matter of course and as a reward for good behaviour. It is important to set up a constructive system where good behaviour, rather than poor, receives the reward of attention.",
      },
      { kind: "heading", text: "Exclusions" },
      {
        kind: "para",
        text: "The Principal or Headmistress may, in his/her discretion, require the parent to remove or may suspend or expel the child from the School if he/she considers that the child's attendance, progress or behaviour (including behaviour outside school) is seriously unsatisfactory and, in the reasonable opinion of the Principal or Headmistress, the removal is in the school's best interests or those of the child or other children.",
      },
      {
        kind: "para",
        text: "The Principal or Headmistress may, in his/her discretion, require the parent(s) to remove, suspend or expel the pupil if the behaviour of either parent and/or the pupil, in the opinion of the Principal or Headmistress, is unreasonable and affects or is likely to affect adversely the child's or other children's progress at the school or the well-being of school staff, or to bring the school into disrepute.",
      },
      {
        kind: "para",
        text: "Should the Principal or Headmistress exercise the above rights, parents will not be entitled to any refund or remission of fees or supplemental charges paid or due and the deposit will be forfeited. However, in such circumstances, fees in lieu of notice will not be payable and any pre-paid fees will be refundable.",
      },
    ],
  },

  // ------------------------------------------------------------ 4.6
  {
    slug: "anti-bullying",
    title: "Anti-Bullying Policy",
    summary:
      "What bullying is, how it is recognised, and why silence is treated as part of the problem.",
    blocks: [
      {
        kind: "para",
        text: "Ali Public School is committed to safeguarding and promoting the welfare of children and young people, along with their protection and expects all staff and management to share this commitment.",
      },
      { kind: "heading", text: "Aims" },
      {
        kind: "list",
        items: [
          "A definition of bullying includes racial, special educational needs, cultural, sexual and disability.",
          "To prevent bullying through the consistent application of a school policy to which all staff are committed.",
        ],
      },
      { kind: "heading", text: "Objectives" },
      {
        kind: "list",
        items: [
          "To understand behaviour that is recognised by both teachers and pupils as bullying.",
          "To promote behaviour that gives everyone at Ali Public School the right to feel safe at all times and to provide an environment which is happy and secure.",
          "To ensure that everyone at Ali Public School is aware that bullying is a serious offence, which can cause long term psychological damage, is unacceptable, and that it will not be tolerated by any member of the school community.",
          "To provide teachers and pupils with strategies for dealing with all aspects of bullying and the prevention of bullying, whether they occur in their own class or at any other time.",
          "To provide training for staff about bullying and its prevention. Each year the staff is invited to update the whole school policy and review procedure.",
        ],
      },
      { kind: "heading", text: "What is bullying?" },
      {
        kind: "list",
        items: [
          "Bullying is behaviour that deliberately intends to harm others by physical, verbal, emotional or psychological means.",
          "Any behaviour which uses the illegitimate use of power over another is bullying behaviour.",
          "Bullying may vary depending on who the bully is, who the victim is and the context of the situation.",
          "Bullying may take place as an isolated incident or may be persistent.",
          "Bullying may be the act of individuals or members of a group. Bullies in a group can be particularly difficult to deal with, but it is important to remember that groups are made up of individuals.",
          "Victims of bullying may be vulnerable, but their vulnerability may not be visible to adults. The victim may look like any other child.",
        ],
      },
      { kind: "heading", text: "Recognising bullies" },
      {
        kind: "para",
        text: "Bullies are not always easily recognised, however, bullies can be the kind of pupils who are:",
      },
      {
        kind: "list",
        items: [
          "Academically achieving less, or achieving as well as — if not better than — their peers.",
          "Unpopular or insecure, or quite secure and happy.",
          "Bullies may also be victims, but this is less common.",
          "Bullies tend to have assertive, aggressive attitudes over which they have little control.",
          "Bullies tend to lack empathy; they cannot imagine what the victim feels.",
          "Bullies tend to lack guilt; they rationalise that the victim somehow 'deserves' the bullying treatment.",
        ],
      },
      {
        kind: "para",
        text: "Staff must consider what witnesses to bullying perceive if no action is taken, and how they will define what is acceptable at school.",
      },
      { kind: "heading", text: "Silence and secrecy" },
      {
        kind: "para",
        text: "Bullying usually takes place in 'secret' locations of the school, areas that are lightly supervised. However, bullying is not necessarily kept secret from other pupils. The reaction of witnesses is a vital one. Witnesses must be encouraged to tell what they know or see. Silence and secrecy undermine the power of the school and affirm the power of the bully.",
      },
      { kind: "heading", text: "Sanctions" },
      {
        kind: "para",
        text: "In the case of persistent and unreasonable bullying and behaviour, including psychological bullying, the Principal or Headmistress may, in his/her discretion, require you to remove or may suspend or expel your child from the School if he/she considers that your child's attendance, progress or behaviour (including behaviour outside school) is seriously unsatisfactory and in the reasonable opinion of the Principal or Headmistress the removal is in the School's best interests or those of your child or other children. All aspects of the pupil's record at the School may be taken into account.",
      },
      {
        kind: "para",
        text: "See also the policy statement for Behaviour, Discipline and Exclusions.",
      },
    ],
  },

  // ------------------------------------------------------------ 4.7
  {
    slug: "complaints",
    title: "Complaints Policy for Parents",
    summary: "How to raise a concern, and what happens after you do.",
    blocks: [
      {
        kind: "para",
        text: "Ali Public School welcomes suggestions and comments from parents, and takes seriously complaints and concerns they may raise. A complaint will be treated as an expression of genuine dissatisfaction which needs a response.",
      },
      { kind: "para", text: "We wish to ensure that:" },
      {
        kind: "list",
        items: [
          "Parents wishing to make a complaint know how to do so",
          "We respond to complaints within a reasonable time and in a courteous and efficient way",
          "Parents realise that we listen and take complaints seriously",
          "We take action where appropriate",
        ],
      },
      { kind: "heading", text: "How should I complain?" },
      {
        kind: "para",
        text: "You can talk directly to a member of staff, write a letter, or telephone. Be as clear as possible about what is troubling you. The Principal will make a written record of all concerns and complaints and the date on which they were received.",
      },
      {
        kind: "para",
        text: "Any member of staff will be happy to help. It may be best to start with the person most closely concerned with the issue. The form or subject teacher is a good start. They may be able to sort things out quickly, with the minimum of fuss, informally. However, you may prefer to take the matter to a more senior member of staff, for example the Principal or Headmistress.",
      },
      { kind: "heading", text: "What will happen next?" },
      {
        kind: "para",
        text: "If you raise something face-to-face or by telephone, it may be possible to resolve the matter immediately and to your satisfaction. In the event that you and the form teacher fail to reach a satisfactory resolution, then you are invited to put the matter in writing to the Principal or Headmistress. We will contact you as soon as possible, to respond to your concerns and explain how we propose to proceed.",
      },
      {
        kind: "para",
        text: "The School recognises and acknowledges your entitlement to complain and we hope to work with you in the best interests of the children in our care.",
      },
    ],
  },

  // ------------------------------------------------------------ 4.9
  {
    slug: "uniform",
    title: "School Uniform",
    summary: "Grey with a blue school logo. The full list, for boys and girls.",
    blocks: [
      {
        kind: "para",
        text: "Our school uniform colours are grey with a blue school logo. Most items are available from school at very competitive prices.",
      },
      { kind: "heading", text: "Boys" },
      {
        kind: "table",
        head: ["Item", "Colour"],
        rows: [
          ["Shirt", "Light grey"],
          ["Trouser", "Dark grey"],
          ["Socks", "Black"],
          ["Shoes", "Black"],
          ["Jumper", "Navy blue"],
          ["Coat", "Medium brown"],
        ],
      },
      { kind: "heading", text: "Girls" },
      {
        kind: "table",
        head: ["Item", "Colour"],
        rows: [
          ["Kamees", "Chequered green"],
          ["Shalwar", "White"],
          ["Dupatta", "White"],
          ["Socks", "Black"],
          ["Shoes", "Black"],
          ["Jumper", "Navy blue"],
          ["Coat", "Medium brown"],
        ],
      },
      {
        kind: "para",
        text: "Please note: we actively discourage all 'adornments' to the basic school uniform, for example nail varnish, large earrings, hair accessories, inappropriate haircuts and all forms of hair colouring.",
      },
    ],
  },

  // ------------------------------------------------------------ 4.10
  {
    slug: "health-and-safety",
    title: "Health & Safety Policy",
    summary:
      "Accidents, hazards, hygiene, security and the rules for school transport.",
    blocks: [
      { kind: "heading", text: "Statement of Intent" },
      {
        kind: "para",
        text: "Ali Public School has appropriate security measures in place to create a safe environment for staff and students, and to protect school property. The Policy is set out in this document. The Policy will be kept under constant review and reviewed at least annually.",
      },
      { kind: "heading", text: "Responsibilities" },
      {
        kind: "para",
        text: "The Health and Safety / Buildings and Premises Committee is responsible for monitoring and reviewing the health and safety policy of the School as and when necessary. The Committee will carry out periodic safety inspections, at least once per academic term. Records of the inspections are discussed at the meetings of the Committee.",
      },
      {
        kind: "para",
        text: "Overall responsibility for the detailed health and safety arrangements within the School lies with the Principal and, in his/her absence, with the designated team leader in charge. It is the Principal's responsibility to ensure compliance with the health and safety regulations.",
      },
      {
        kind: "para",
        text: "All employees have the responsibility to co-operate to achieve a healthy and safe workplace and to take reasonable care of themselves and others. Whenever an employee notices a health and safety problem this should be drawn to the attention of the Principal immediately, who will record it in the incident book.",
      },
      { kind: "heading", text: "Accidents" },
      {
        kind: "para",
        text: "All accidents are recorded and monitored. We have two first-aid boxes, one in the junior section and one in the senior section. If there is an emergency situation, a school van is called to transport a child to hospital. Wherever possible, the parent should accompany their child. If this is not possible, the child is accompanied by at least one member of staff.",
      },
      { kind: "heading", text: "Reporting hazards" },
      {
        kind: "para",
        text: "All staff are responsible for reporting hazards. It is then the Principal's responsibility to follow up this report. The Committee monitors the action taken to remedy hazards.",
      },
      { kind: "heading", text: "Electrical safety" },
      {
        kind: "para",
        text: "All staff are expected to visually check equipment before use and report damage and remove it from the area with a notice saying 'Fault — Do Not Use'. In addition, a risk assessment is carried out on an annual basis and appliances tested by a qualified electrician.",
      },
      {
        kind: "para",
        text: "Staff should note that particular care needs to be taken with extension leads, to avoid trailing wires. No electrical equipment should be introduced into school from home without the prior agreement of the Principal.",
      },
      { kind: "heading", text: "Substances hazardous to health" },
      {
        kind: "para",
        text: "Any substances marked as dangerous are not left in classrooms. Staff should check that instructions are followed when using any such substances. Teaching staff should note that the use of chemicals in science should be checked with the science co-ordinator or the Principal.",
      },
      { kind: "heading", text: "Equipment" },
      {
        kind: "para",
        text: "It is the responsibility of all staff to ensure that equipment is in good working order and is stored safely. Any faulty equipment should be withdrawn from use and reported to the Principal, with a note saying 'Fault — Do Not Use'.",
      },
      { kind: "heading", text: "Smoking" },
      {
        kind: "para",
        text: "Ali Public School has adopted a strict no smoking policy within the school buildings, playgrounds, vehicles and all other property.",
      },
      { kind: "heading", text: "Hygiene" },
      {
        kind: "para",
        text: "It is the responsibility of the Principal to monitor the cleanliness of the building. This is part of the weekly visual inspection. All staff are responsible for encouraging good hygiene habits in the children. Particular emphasis is placed on hand washing.",
      },
      { kind: "heading", text: "Outdoor visits" },
      {
        kind: "para",
        text: "These are considered a vital part of our work. Any outdoor visit is carefully researched and evaluated by the Principal. Parental consent for the visit is always sought. Staff should be aware of the Ali Public School guidelines for educational visits.",
      },
      { kind: "heading", text: "School Vans" },
      {
        kind: "para",
        text: "Students who avail Ali Public School transport facility are strongly advised to sit inside the vans at all times. It is the responsibility of students and their parents to take such actions and abide by the rules, as the school will not be held accountable for any outcome of non-compliance with School policy, advice and instruction. Students and their parents or guardians must live by the School's Core Values, one of which is taking Responsibility for one's actions and behaviour. When students are out on the road, the Core Value of taking Responsibility takes on added importance.",
      },
      {
        kind: "para",
        text: "Ali Public School has taken all necessary measures within its powers for safe transport. These include, but are not limited to, use of new vans that have adequate head covers, adequate seating, the presence of conductors and employment of well qualified drivers. All drivers and conductors of Ali Public School have strict instructions to look after the students and are vigilant at all times. Failure to comply with this policy will result in official disciplinary action.",
      },
      { kind: "heading", text: "Security" },
      {
        kind: "para",
        text: "All staff and pupils are encouraged to be aware of strangers on the premises. If a visitor is unknown, identification should be requested. Staff are encouraged to challenge strangers and ask for identification. Visitors are requested to enter only by the front door. Any act of violence or abuse towards a member of staff must be reported to the Principal, who will take the appropriate action. All staff are asked to be alert to suspicious activities.",
      },
      { kind: "heading", text: "Contractors" },
      {
        kind: "para",
        text: "All contractors are expected to report their arrival and departure to the Principal or office staff before commencing work. If they are working in an unsafe manner they may be asked to stop work by the Principal.",
      },
      { kind: "heading", text: "Staff and the health and safety policy" },
      {
        kind: "para",
        text: "All staff, teaching and non-teaching, are given a copy of the policy. New staff are given a copy and are required to confirm they have read it.",
      },
    ],
  },

  // ------------------------------------------------------------ 4.11
  {
    slug: "visitors",
    title: "Visitors Policy",
    summary: "How visits are arranged, and the behaviour expected on school grounds.",
    blocks: [
      { kind: "heading", text: "Visitors" },
      {
        kind: "para",
        text: "To ensure the safety of students and staff and minimum interruption of the instructional programme, the designee shall establish procedures which facilitate visits during regular school days. Visits during school hours should be first arranged with the designee.",
      },
      {
        kind: "para",
        text: "Any person who is not a student or staff member shall register immediately upon entering the school building or grounds when school is in session. No outsider shall enter or remain on school grounds during school hours without having registered with the designee.",
      },
      {
        kind: "para",
        text: "The School encourages all individuals to assist in maintaining a safe and secure school environment by behaving in an orderly manner while on school grounds. In accordance with the policy, the designee may request that any individual who is causing a disruption, including exhibiting volatile, hostile, aggressive, sexual or offensive behaviour, immediately leave school grounds.",
      },
      {
        kind: "para",
        text: "For purposes of school safety and security, the designee may design a visible means of identification for visitors while on school premises. No electronic listening or recording device may be used by students or visitors in a classroom without the designee's permission.",
      },
      {
        kind: "para",
        text: "Unless otherwise directed by the designee, a staff member shall accompany visitors while they are on school grounds. In order to register, a visitor shall, upon request, furnish the designee with the following information:",
      },
      {
        kind: "list",
        items: [
          "His or her name, address and occupation",
          "His or her age",
          "His or her purpose for entering school grounds",
          "Proof of identity",
        ],
      },
      {
        kind: "para",
        text: "The designee may refuse to register any visitor if he reasonably concludes that the individual's presence or acts would disrupt the school, students, or employees; would result in damage to property; or would result in the distribution or use of a controlled substance. The designee may revoke any visitor's registration if he has a reasonable basis for concluding that the individual's presence on school grounds would interfere with the peaceful conduct of school activities or would disrupt the school, students, or staff.",
      },
      {
        kind: "para",
        text: "When a visitor fails to register, or when the designee denies or revokes a visitor's registration privileges, the designee may request that the individual promptly leave school grounds.",
      },
      { kind: "heading", text: "Unacceptable Behaviour" },
      {
        kind: "para",
        text: "Types of behaviour that are considered serious and unacceptable and therefore will not be tolerated. This is not an exhaustive list but seeks to provide illustrations of unacceptable behaviour.",
      },
      {
        kind: "list",
        items: [
          "Loud, raised voices or shouting, either in person or over the phone",
          "Physically intimidating a member of staff or invading their personal space",
          "The use of aggressive or impolite hand or face gestures",
          "Threatening school staff",
          "Showing or holding a fist towards another person",
          "Writing abusive comments about a member of staff",
          "Abusive language and swearing",
          "Pushing, spitting or tripping",
          "Hitting, for example slapping, punching or kicking",
          "Racist, ageist or sexist comments",
          "Breaking the school's security procedures",
          "Written or verbal accusatory comments",
          "Slanderous or libellous comments",
        ],
      },
      {
        kind: "para",
        text: "Continuation of unacceptable behaviour will result in the designee being informed of the incident.",
      },
    ],
  },
];

/**
 * Each policy's own page — its URL on the legacy WordPress site, kept
 * exactly (including the misspelt `school-unifrom`, which is the address
 * Google has indexed). The accordion above links each row to its page, and
 * `src/data/legacy-pages.ts` renders the pages themselves.
 */
export const policyPaths: Record<string, string> = {
  "school-rules": "/academics/school-rules/",
  attendance: "/academics/student-attendance-policy/",
  homework: "/academics/homework-policy/",
  behaviour: "/academics/behaviour-discipline-exclusions/",
  "anti-bullying": "/academics/anti-bullying-policy/",
  complaints: "/academics/complaints-policy-for-parents/",
  uniform: "/academics/school-unifrom/",
  "health-and-safety": "/academics/health-safety-policy/",
  visitors: "/academics/visitors-policy/",
};
