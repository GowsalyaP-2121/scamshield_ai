# 🛡️ ScamShield AI

**Detect scam messages and identify risk levels with AI-powered analysis**

ScamShield AI is an intelligent web application that uses Google's Gemini AI to analyze messages (SMS, emails, or any text) for potential scam indicators. It identifies the risk level and provides actionable recommendations to protect you from financial scams.

## 🌐 Live Demo

**Public URL:** https://gowsalyap-2121.github.io/scamshield_ai/

Access the live application and start analyzing messages immediately!

## ✨ Features

- 🔍 **AI-Powered Analysis**: Leverages Google Gemini AI for sophisticated scam detection
- 📊 **Risk Level Assessment**: Categorizes messages as LOW, MEDIUM, or HIGH risk
- 💡 **Actionable Recommendations**: Provides specific do's and don'ts
- 🎯 **Scam Indicators**: Identifies specific red flags in messages
- 📱 **Responsive Design**: Works perfectly on desktop and mobile devices
- 🔒 **Privacy Focused**: Your API key is stored locally in your browser
- 🚀 **No Installation Required**: Web-based, instant access

## 🚀 Quick Start

### Using the Live Application

1. Visit the live URL: https://gowsalyap-2121.github.io/scamshield_ai/
2. Get your Google AI API key (see instructions below)
3. Enter your API key in the configuration section
4. Paste any suspicious message and click "Analyze Message"
5. Review the risk assessment and recommendations

### Getting Your Google AI API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key
5. Paste it in the ScamShield AI application's API Configuration section

**Note:** The API key is stored locally in your browser and never sent to any server except Google's AI API.

## 💻 Running Locally

If you want to run the application on your local machine:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/GowsalyaP-2121/scamshield_ai.git
   cd scamshield_ai
   ```

2. **Open in browser:**
   Simply open `index.html` in your web browser:
   ```bash
   # On macOS
   open index.html
   
   # On Linux
   xdg-open index.html
   
   # On Windows
   start index.html
   ```

   Or use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js (with http-server)
   npx http-server
   ```

3. **Configure your API key:**
   - Get your API key from Google AI Studio
   - Enter it in the application's configuration section

## 📖 How It Works

1. **Message Input**: User enters a suspicious message
2. **AI Analysis**: The message is sent to Google Gemini AI with a specialized prompt
3. **Risk Assessment**: AI analyzes the message for scam indicators like:
   - Urgency and pressure tactics
   - Requests for personal/financial information
   - Suspicious links or contact details
   - Grammar and spelling errors
   - Too-good-to-be-true offers
   - Impersonation attempts
   - Emotional manipulation
4. **Results Display**: Shows risk level, detailed analysis, and recommendations

## 🎯 Example Use Cases

- **SMS Messages**: "You've won a prize! Click this link..."
- **Email Phishing**: "Your account has been compromised..."
- **Social Media**: Suspicious direct messages or comments
- **Financial Scams**: Investment opportunities, lottery wins
- **Romance Scams**: Suspicious online relationship requests

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **AI Model**: Google Gemini Pro
- **Hosting**: GitHub Pages
- **API**: Google Generative Language API

## 📁 Project Structure

```
scamshield_ai/
├── index.html          # Main HTML file
├── styles.css          # Styling and responsive design
├── app.js             # Application logic and AI integration
├── README.md          # Documentation (this file)
└── DEPLOYMENT.md      # Deployment instructions
```

## 🔐 Security & Privacy

- **API Key Storage**: Your API key is stored only in your browser's local storage
- **No Server**: All processing happens client-side except for AI API calls
- **No Data Collection**: We don't store or collect any messages you analyze
- **HTTPS**: The live site uses HTTPS for secure communication

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and commit: `git commit -m 'Add feature'`
4. Push to your fork: `git push origin feature-name`
5. Create a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Google Gemini AI for providing the AI model
- GitHub Pages for hosting
- The open-source community

## 📧 Contact

For questions or feedback:
- GitHub: [@GowsalyaP-2121](https://github.com/GowsalyaP-2121)
- Repository: [scamshield_ai](https://github.com/GowsalyaP-2121/scamshield_ai)

## ⚠️ Disclaimer

ScamShield AI is a tool to help identify potential scams but should not be your only defense. Always exercise caution and verify suspicious messages through official channels. The application's accuracy depends on the AI model and may not catch all scams or may occasionally flag legitimate messages. 
