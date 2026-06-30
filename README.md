# Prompt Injection & Jailbreak Detection in Large Language Models (LLMs)

## Project Overview

This project aims to detect and prevent Prompt Injection and Jailbreak attacks in LLM-based systems. The framework combines rule-based detection, semantic retrieval, and machine learning classification to identify malicious prompts that attempt to manipulate, override, or extract hidden information from language models.

The system enhances AI safety by sanitizing inputs, detecting attack patterns, classifying attack types, and assigning risk levels before prompts reach the target LLM.

---

## Objectives

* Detect prompt injection attacks
* Detect jailbreak attempts
* Identify prompt extraction attacks
* Classify attack categories
* Assign risk levels to prompts
* Improve reliability and safety of LLM-based applications

---

## System Architecture

User Prompt
↓
Sanitizer
↓
Rule Engine
↓
Hybrid Detector
├── XLM-R Classifier
└── FAISS Retrieval
↓
Risk Scoring Engine
↓
Final Decision

---

## Components

### 1. Sanitizer

The sanitizer removes hidden or malicious formatting tricks used in prompt injection attacks.

Features:

* Unicode normalization
* Zero-width character removal
* Whitespace normalization
* Base64 decoding detection

File:

* security/sanitizer.py

---

### 2. Rule Engine

The rule engine detects known prompt injection patterns using predefined rules.

Detected Categories:

* Instruction Override
* Prompt Extraction
* DAN Jailbreak
* Authority Manipulation
* Role Play
* Safety Override

File:

* security/rule_engine.py

---

### 3. XLM-R Attack Classifier

A fine-tuned XLM-RoBERTa model is used to classify prompts into attack categories.

Supported Classes:

* A0_Unknown
* A1_Instruction_Override
* A2_Prompt_Extraction
* A3_Role_Play
* A4_Indirect_Prompt_Injection
* A5_Jailbreak
* A6_Obfuscated_Attack
* A8_Safe
* A9_Authority_Manipulation
* A10_Multi_Turn_Attack
* A11_Context_Reframing
* A12_Persona_Modulation
* A13_Indirect_RAG_Injection

Model Directory:

* models/

---

### 4. FAISS Retrieval Engine

FAISS is used to retrieve semantically similar attack examples from the attack dataset.

Features:

* Nearest-neighbor retrieval
* Attack similarity search
* Contextual explanation support

Files:

* faiss/attack_retrieval.index
* faiss/faiss_dataset.csv
* faiss/attack_mapping.json

---

### 5. Hybrid Detection Engine

Combines:

* XLM-R prediction
* FAISS retrieval
* Rule engine outputs

to improve detection reliability.

File:

* main_pipeline.py

---

### 6. Risk Scoring

Risk levels assigned:

* LOW
* MEDIUM
* HIGH
* CRITICAL

Risk is determined using:

* Predicted attack type
* Retrieval similarity
* Rule matches
* Model confidence
* Detector disagreement analysis

---

## Example Output

{
"attack_detected": true,
"predicted_attack": "A5_Jailbreak",
"confidence": 0.97,
"risk": "CRITICAL"
}

---

## Project Structure

PI_JB_Project/

├── api.py

├── main_pipeline.py

├── requirements.txt

├── .gitignore

├── models/

├── faiss/

├── security/
│   ├── sanitizer.py
│   └── rule_engine.py

├── ui/

├── notebooks/
│   ├── 14_hybrid_detector.ipynb
│   └── 15_evaluation.ipynb

---

## Installation

Install dependencies:

pip install -r requirements.txt

---

## Running the System

Start API:

python api.py

Run detector:

python main_pipeline.py

---

## Technologies Used

* Python
* PyTorch
* Transformers
* XLM-RoBERTa
* FAISS
* Sentence Transformers
* Pandas
* NumPy
* Flask

---

## Future Improvements

* Real-time LLM gateway protection
* Advanced multilingual attack detection
* RAG-specific prompt injection defenses
* Explainable AI attack analysis
* Production deployment with React frontend

---

## Authors

Prompt Injection & Jailbreak Prevention Research Project Team

Summer Internship Project
