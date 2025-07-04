# RAG Assistant Frontend

A production-ready Next.js 14 frontend for a Retrieval-Augmented Generation (RAG) assistant. Built with TypeScript, Tailwind CSS, and modern React patterns.

## Features

- 🚀 **Next.js 14** with App Router and TypeScript
- 📁 **File Upload** - Drag & drop PDF/DOCX files with progress tracking
- 💬 **Real-time Chat** - Interactive chat interface with markdown support
- 🎨 **Modern UI** - Clean, responsive design with Tailwind CSS
- 📱 **Mobile Friendly** - Fully responsive across all devices
- 🔄 **Session Management** - Automatic session handling with Zustand
- ✨ **Rich Markdown** - Support for tables, code blocks, images, and more
- 🚨 **Error Handling** - Comprehensive error handling with toast notifications

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Markdown**: react-markdown with remark-gfm, rehype-raw, rehype-highlight
- **File Upload**: react-dropzone
- **Icons**: Lucide React
- **Notifications**: react-hot-toast

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. **Clone and install dependencies**:
   \`\`\`bash
   git clone <your-repo-url>
   cd rag-assistant-frontend
   pnpm install
   \`\`\`

2. **Set up environment variables**:
   Create a \`.env.local\` file in the root directory:
   \`\`\`env
   NEXT_PUBLIC_API_URL=http://localhost:8000
   \`\`\`
   
   Replace with your actual backend URL for production.

3. **Start the development server**:
   \`\`\`bash
   pnpm dev
   \`\`\`

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Backend Integration

This frontend expects a backend with the following API endpoints:

### POST /new-session
- **Purpose**: Initialize a new chat session
- **Returns**: \`{ "session_id": string }\`

### POST /upload
- **Purpose**: Upload PDF/DOCX files
- **Content-Type**: multipart/form-data
- **Fields**: 
  - \`session_id\` (text)
  - \`file\` (file, can be multiple)
- **Returns**: JSON status summary

### POST /query
- **Purpose**: Send a query to the RAG assistant
- **Content-Type**: multipart/form-data
- **Fields**:
  - \`session_id\` (text)
  - \`user_query\` (text)
- **Returns**: \`{ "response": markdown_string }\`

**Important**: All endpoints must accept POST requests only, and the backend should have CORS configured to allow requests from your frontend domain.

## Project Structure

\`\`\`
src/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main page component
├── components/
│   ├── ChatInput.tsx        # Chat input with send functionality
│   ├── ChatWindow.tsx       # Chat messages display
│   ├── FileUploader.tsx     # Drag & drop file upload
│   └── MarkdownRenderer.tsx # Markdown rendering component
├── hooks/
│   └── useSession.ts        # Zustand store for session management
└── lib/
    └── api.ts               # API client functions
\`\`\`

## Key Features

### File Upload
- Drag & drop interface for PDF and DOCX files
- Multiple file upload support
- Real-time upload progress tracking
- Visual feedback for upload status

### Chat Interface
- Clean, WhatsApp-style chat bubbles
- Automatic scrolling to latest messages
- Rich markdown rendering with syntax highlighting
- Support for tables, images, and code blocks

### Session Management
- Automatic session initialization
- Persistent session state during page usage
- Error handling and recovery
- File upload state tracking

### Responsive Design
- Mobile-first approach
- Adaptive layout for desktop and mobile
- Touch-friendly interface elements
- Optimized for various screen sizes

## Deployment

### Vercel (Recommended)

1. **Push to GitHub**:
   \`\`\`bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   \`\`\`

2. **Deploy to Vercel**:
   - Connect your GitHub repository to Vercel
   - Set the environment variable \`NEXT_PUBLIC_API_URL\` to your production backend URL
   - Deploy automatically

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| \`NEXT_PUBLIC_API_URL\` | Backend API base URL | \`https://api.yourapp.com\` |

## Development

### Available Scripts

- \`pnpm dev\` - Start development server
- \`pnpm build\` - Build for production
- \`pnpm start\` - Start production server
- \`pnpm lint\` - Run ESLint
- \`pnpm type-check\` - Run TypeScript type checking

### Code Style

- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting (recommended)
- Tailwind CSS for styling

## Contributing

1. Fork the repository
2. Create a feature branch: \`git checkout -b feature/amazing-feature\`
3. Commit your changes: \`git commit -m 'Add amazing feature'\`
4. Push to the branch: \`git push origin feature/amazing-feature\`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. For urgent matters, contact the development team

---

Built with ❤️ using Next.js 14 and modern web technologies.
\`\`\`
