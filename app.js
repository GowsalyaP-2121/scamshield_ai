// ScamShield AI - Application Logic

class ScamShieldAI {
    constructor() {
        this.apiKey = this.loadApiKey();
        this.initializeElements();
        this.attachEventListeners();
        this.updateApiStatus();
    }

    initializeElements() {
        this.elements = {
            messageInput: document.getElementById('messageInput'),
            analyzeBtn: document.getElementById('analyzeBtn'),
            clearBtn: document.getElementById('clearBtn'),
            loading: document.getElementById('loading'),
            result: document.getElementById('result'),
            error: document.getElementById('error'),
            riskScore: document.getElementById('riskScore'),
            riskBar: document.getElementById('riskBar'),
            analysis: document.getElementById('analysis'),
            dosList: document.getElementById('dosList'),
            dontsList: document.getElementById('dontsList'),
            apiKeyInput: document.getElementById('apiKeyInput'),
            saveApiKey: document.getElementById('saveApiKey'),
            apiStatus: document.getElementById('apiStatus')
        };
    }

    attachEventListeners() {
        this.elements.analyzeBtn.addEventListener('click', () => this.analyzeMessage());
        this.elements.clearBtn.addEventListener('click', () => this.clearForm());
        this.elements.saveApiKey.addEventListener('click', () => this.saveApiKey());
        
        // Example buttons
        document.querySelectorAll('.example-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const example = e.target.dataset.example;
                this.elements.messageInput.value = example;
            });
        });

        // Enter key to analyze
        this.elements.messageInput.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'Enter') {
                this.analyzeMessage();
            }
        });
    }

    loadApiKey() {
        return localStorage.getItem('gemini_api_key') || '';
    }

    saveApiKey() {
        const apiKey = this.elements.apiKeyInput.value.trim();
        
        if (!apiKey) {
            this.showError('Please enter an API key');
            return;
        }

        localStorage.setItem('gemini_api_key', apiKey);
        this.apiKey = apiKey;
        this.elements.apiKeyInput.value = '';
        this.updateApiStatus();
        this.showSuccess('API key saved successfully!');
    }

    updateApiStatus() {
        if (this.apiKey) {
            this.elements.apiStatus.textContent = '✓ API key is configured';
            this.elements.apiStatus.className = 'api-status success';
        } else {
            this.elements.apiStatus.textContent = '⚠ API key not configured';
            this.elements.apiStatus.className = 'api-status error';
        }
    }

    async analyzeMessage() {
        const message = this.elements.messageInput.value.trim();

        if (!message) {
            this.showError('Please enter a message to analyze');
            return;
        }

        if (!this.apiKey) {
            this.showError('Please configure your Google AI API key first');
            return;
        }

        this.showLoading();

        try {
            const result = await this.callGeminiAPI(message);
            this.displayResults(result);
        } catch (error) {
            console.error('Error:', error);
            this.showError(`Analysis failed: ${error.message}`);
        }
    }

    async callGeminiAPI(message) {
        const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${this.apiKey}`;

        const prompt = `Analyze the following message for potential scam indicators and provide a detailed assessment:

Message: "${message}"

Please provide your analysis in the following JSON format:
{
    "riskLevel": "LOW" | "MEDIUM" | "HIGH",
    "riskPercentage": <number between 0-100>,
    "analysis": "<detailed explanation of why this message is or isn't a scam>",
    "indicators": ["<list of specific scam indicators found>"],
    "dos": ["<list of recommended actions to take>"],
    "donts": ["<list of actions to avoid>"]
}

Consider factors such as:
- Urgency and pressure tactics
- Requests for personal or financial information
- Suspicious links or phone numbers
- Grammar and spelling errors
- Too-good-to-be-true offers
- Impersonation of legitimate organizations
- Emotional manipulation

Respond only with valid JSON.`;

        const requestBody = {
            contents: [{
                parts: [{
                    text: prompt
                }]
            }],
            generationConfig: {
                temperature: 0.4,
                topK: 32,
                topP: 1,
                maxOutputTokens: 2048,
            }
        };

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || 'API request failed');
        }

        const data = await response.json();
        const text = data.candidates[0].content.parts[0].text;
        
        // Extract JSON from the response
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
            throw new Error('Invalid response format from AI');
        }

        return JSON.parse(jsonMatch[0]);
    }

    displayResults(result) {
        // Hide loading and error
        this.elements.loading.classList.add('hidden');
        this.elements.error.classList.add('hidden');
        
        // Show result section
        this.elements.result.classList.remove('hidden');

        // Display risk level
        const riskLevel = result.riskLevel.toUpperCase();
        const riskPercentage = result.riskPercentage || 0;
        
        this.elements.riskScore.textContent = `${riskLevel} (${riskPercentage}%)`;
        this.elements.riskBar.style.width = `${riskPercentage}%`;
        
        // Set color based on risk level
        this.elements.riskBar.className = 'risk-bar';
        if (riskLevel === 'LOW') {
            this.elements.riskBar.classList.add('risk-low');
        } else if (riskLevel === 'MEDIUM') {
            this.elements.riskBar.classList.add('risk-medium');
        } else {
            this.elements.riskBar.classList.add('risk-high');
        }

        // Display analysis
        let analysisHTML = `<p><strong>Analysis:</strong></p><p>${result.analysis}</p>`;
        
        if (result.indicators && result.indicators.length > 0) {
            analysisHTML += `<p><strong>Scam Indicators Found:</strong></p><ul>`;
            result.indicators.forEach(indicator => {
                analysisHTML += `<li>${indicator}</li>`;
            });
            analysisHTML += `</ul>`;
        }
        
        this.elements.analysis.innerHTML = analysisHTML;

        // Display recommendations
        this.displayList(this.elements.dosList, result.dos || []);
        this.displayList(this.elements.dontsList, result.donts || []);

        // Scroll to results
        this.elements.result.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    displayList(element, items) {
        element.innerHTML = '';
        items.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            element.appendChild(li);
        });
    }

    showLoading() {
        this.elements.loading.classList.remove('hidden');
        this.elements.result.classList.add('hidden');
        this.elements.error.classList.add('hidden');
        this.elements.analyzeBtn.disabled = true;
    }

    showError(message) {
        this.elements.loading.classList.add('hidden');
        this.elements.result.classList.add('hidden');
        this.elements.error.classList.remove('hidden');
        this.elements.error.textContent = `❌ ${message}`;
        this.elements.analyzeBtn.disabled = false;
    }

    showSuccess(message) {
        this.elements.error.classList.remove('hidden');
        this.elements.error.style.background = '#d1fae5';
        this.elements.error.style.borderColor = '#10b981';
        this.elements.error.style.color = '#065f46';
        this.elements.error.textContent = `✓ ${message}`;
        
        setTimeout(() => {
            this.elements.error.classList.add('hidden');
            this.elements.error.style.background = '';
            this.elements.error.style.borderColor = '';
            this.elements.error.style.color = '';
        }, 3000);
    }

    clearForm() {
        this.elements.messageInput.value = '';
        this.elements.result.classList.add('hidden');
        this.elements.error.classList.add('hidden');
        this.elements.analyzeBtn.disabled = false;
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ScamShieldAI();
});
