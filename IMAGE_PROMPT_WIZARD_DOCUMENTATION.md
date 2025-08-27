# Image Prompt Wizard - Complete Documentation

## Overview

The Image Prompt Wizard is a comprehensive React component designed to guide users through the process of creating detailed, structured prompts for AI image generation. Built with Next.js, TypeScript, and Tailwind CSS, it provides an intuitive step-by-step interface that helps users craft professional-quality prompts by breaking down the process into logical, manageable steps.

## Table of Contents

1. [Features](#features)
2. [Architecture](#architecture)
3. [Component Structure](#component-structure)
4. [Step-by-Step Guide](#step-by-step-guide)
5. [Technical Implementation](#technical-implementation)
6. [API Reference](#api-reference)
7. [Usage Examples](#usage-examples)
8. [Customization](#customization)
9. [Troubleshooting](#troubleshooting)
10. [Best Practices](#best-practices)

## Features

### Core Functionality
- **4-Step Wizard Interface**: Guided process through subject definition, mood/environment, composition, and review
- **Real-time Progress Tracking**: Visual progress indicator with step completion status
- **Form Validation**: Built-in validation and unsaved changes detection
- **Prompt Generation**: Automatic generation of structured prompts with natural language dividers
- **Export Options**: Multiple export formats (TXT, JSON) with metadata
- **Clipboard Integration**: One-click copying of generated prompts

### Advanced Features
- **Navigation Protection**: Warns users about unsaved changes when navigating away
- **Interactive Examples**: Visual examples and help modals for composition techniques
- **Emoji Integration**: Expressive elements to enhance prompt personality
- **Responsive Design**: Mobile-friendly interface with adaptive layouts
- **Accessibility**: Full keyboard navigation and screen reader support

### UI/UX Enhancements
- **Tooltip System**: Contextual help for each input field
- **Visual Feedback**: Color-coded step indicators and progress bars
- **Modal System**: Clean, focused interfaces for detailed interactions
- **Badge System**: Visual representation of selected prompt elements

## Architecture

### Technology Stack
- **Framework**: Next.js 15.3.3 with App Router
- **Language**: TypeScript 5.x
- **Styling**: Tailwind CSS 4.1.8
- **UI Components**: Radix UI primitives with custom styling
- **Icons**: Lucide React
- **State Management**: React useState and useEffect hooks

### File Structure
```
components/
├── image-prompt-wizard.tsx          # Main component
├── image-prompt-wizard-with-tips.tsx # Alternative version with tips
└── ui/                              # Reusable UI components
    ├── button.tsx
    ├── card.tsx
    ├── input.tsx
    ├── modal.tsx
    └── ...
```

## Component Structure

### Main Component: `ImagePromptWizard`

The main component is a functional React component that manages the entire wizard flow:

```typescript
export function ImagePromptWizard() {
  // State management
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState(INITIAL_FORM_DATA)
  const [isModalOpen, setIsModalOpen] = useState(false)
  // ... additional state

  // Core functions
  const nextStep = () => { /* ... */ }
  const prevStep = () => { /* ... */ }
  const generatePrompt = () => { /* ... */ }
  const renderStepContent = () => { /* ... */ }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Progress Header */}
      {/* Steps Navigation */}
      {/* Main Content */}
      {/* Navigation */}
      {/* Modals */}
    </div>
  )
}
```

### Supporting Components

#### TipCard Component
Provides contextual help and tips for each step:

```typescript
function TipCard({ 
  icon, 
  title, 
  tips, 
  helpImageSrc, 
  helpTitle, 
  helpText 
}: {
  icon: React.ReactNode
  title: string
  tips: string[]
  helpImageSrc?: string
  helpTitle?: string
  helpText?: string
})
```

## Step-by-Step Guide

### Step 1: Subject & Details

**Purpose**: Define the main subject(s) and core details of the image.

**Input Fields**:
- **Main Subject**: Text input for describing the primary focus
- **Additional Details**: Textarea for supplementary information

**Key Features**:
- Tooltips with contextual help
- Example integration with visual aids
- Real-time validation

**Best Practices**:
- Be specific about subjects (name people to avoid AI-face issues)
- Use vivid adjectives for textures
- Include actions for dynamism
- Use parentheses for emphasis

**Example Input**:
```
Main Subject: James, Jacob and Emma in a hall venue celebrating. Sitting by their table.

Additional Details: (table is wooden with a reflective surface) (subjects are toasting) 
(festive decorations hanging from the ceiling) (brick wall background) 
(the table is in a room with a window) (urban setting) 
(Subjects dressed in tailored suits, cocktail dresses)
```

### Step 2: Mood & Environment

**Purpose**: Set the emotional tone and environmental context.

**Input Fields**:
- **Venue Type**: Select dropdown (Outdoor, Indoor, Hybrid/Open-air)
- **Mood & Atmosphere**: Select dropdown with 15+ mood options
- **Location**: Custom input or quick select options
- **Expressive Elements**: Interactive emoji selection

**Available Moods**:
- Vibrant, Welcoming, Playful, Casual, Dynamic
- Intimate, Stylish, Modern, Cozy, Sophisticated
- Eclectic, Relaxed, Lush, Serene, Rustic

**Location Options**:
- Table side, By water, By a harbor
- On grassy field, In urban environment
- Industrial indoor

**Emoji Integration**:
- 26+ expressive emojis
- Automatic addition to details field
- Visual feedback for selection

### Step 3: Composition & Technical Details

**Purpose**: Define the visual composition and technical parameters.

**Input Fields**:
- **Composition**: Select dropdown with 6 composition types
- **Lighting**: Select dropdown with 5 lighting options
- **Aspect Ratio**: Select dropdown with 4 ratio options

**Composition Types**:
- Close-up, Wide Angle Shot, Bird's Eye View
- Low Angle, Rule of Thirds, Drone Camera

**Lighting Options**:
- Soft Natural, Golden Hour, Dramatic Shadows
- Cool Ambient Light, Spotlight

**Aspect Ratios**:
- Square (1:1), Landscape (16:9)
- Portrait (9:16), Standard (4:3)

**Visual Examples**:
- Modal with composition examples
- Image references for each technique
- Fallback to default example image

### Step 4: Review & Generate

**Purpose**: Review all inputs and generate the final prompt.

**Features**:
- **Prompt Preview**: Real-time display of generated prompt
- **Element Badges**: Visual representation of selected elements
- **Export Options**: Multiple format support
- **Final Actions**: Copy, export, or edit prompt

**Generated Prompt Format**:
```
James, Jacob and Emma in a hall venue celebrating. Sitting by their table.
– indoor style
– modern mood
– Location: tableside
– wide shot
– soft natural lighting
– (table is wooden with a reflective surface) (subjects are toasting)
– Aspect ratio: 16:9
```

## Technical Implementation

### State Management

The component uses React's built-in state management with the following key state variables:

```typescript
const INITIAL_FORM_DATA = {
  subject: "",
  style: "",
  mood: "",
  location: "",
  composition: "",
  lighting: "",
  details: "",
  aspectRatio: "",
  quality: "",
  weight: "0.75",
  seed: "",
  selectedEmojis: [] as string[],
}
```

### Navigation Protection

Implements comprehensive navigation protection:

```typescript
useEffect(() => {
  const handleBeforeUnload = (e: BeforeUnloadEvent) => {
    if (hasUnsavedChanges()) {
      e.preventDefault()
      e.returnValue = "You have unsaved changes. Are you sure you want to leave?"
    }
  }

  const handlePopState = (e: PopStateEvent) => {
    if (hasUnsavedChanges()) {
      // Show navigation warning modal
    }
  }

  window.addEventListener('beforeunload', handleBeforeUnload)
  window.addEventListener('popstate', handlePopState)

  return () => {
    window.removeEventListener('beforeunload', handleBeforeUnload)
    window.removeEventListener('popstate', handlePopState)
  }
}, [formData])
```

### Prompt Generation Algorithm

The prompt generation uses a structured approach with natural language dividers:

```typescript
const generatePrompt = () => {
  const parts = []

  if (formData.subject) parts.push(formData.subject)
  if (formData.style) parts.push(`– ${formData.style} style`)
  if (formData.mood) parts.push(`– ${formData.mood} mood`)
  if (formData.location) parts.push(`– Location: ${formData.location}`)
  if (formData.composition) parts.push(`– ${formData.composition}`)
  if (formData.lighting) parts.push(`– ${formData.lighting} lighting`)
  if (formData.details) parts.push(`– ${formData.details}`)
  if (formData.aspectRatio) parts.push(`– Aspect ratio: ${formData.aspectRatio}`)

  return parts.join("\n")
}
```

### Export Functionality

Supports multiple export formats with comprehensive metadata:

```typescript
// Text Export
const textContent = `AI Image Generation Prompt
Generated by BotanicCanvas Prompt Wizard
Date: ${new Date().toLocaleDateString()}
Time: ${new Date().toLocaleTimeString()}

PROMPT:
${editablePrompt}

PARAMETERS:
- Aspect Ratio: ${formData.aspectRatio || 'Default'}
- Quality: ${formData.quality || 'Default'}
- Weight: ${formData.weight || 'Default'}
- Seed: ${formData.seed || 'Random'}

METADATA:
- Subject: ${formData.subject || 'N/A'}
- Style: ${formData.style || 'N/A'}
- Mood: ${formData.mood || 'N/A'}
- Location: ${formData.location || 'N/A'}
- Composition: ${formData.composition || 'N/A'}
- Lighting: ${formData.lighting || 'N/A'}
- Details: ${formData.details || 'N/A'}`

// JSON Export
const exportData = {
  prompt: editablePrompt,
  parameters: {
    aspectRatio: formData.aspectRatio,
    quality: formData.quality,
    weight: formData.weight,
    seed: formData.seed
  },
  metadata: {
    subject: formData.subject,
    style: formData.style,
    mood: formData.mood,
    location: formData.location,
    composition: formData.composition,
    lighting: formData.lighting,
    details: formData.details,
    generatedAt: new Date().toISOString(),
    source: "BotanicCanvas Prompt Wizard"
  }
}
```

## API Reference

### Props

The main component doesn't accept props as it's self-contained, but the TipCard component accepts:

```typescript
interface TipCardProps {
  icon: React.ReactNode
  title: string
  tips: string[]
  helpImageSrc?: string
  helpTitle?: string
  helpText?: string
}
```

### Events

The component doesn't emit events but provides callback functions for:

- **Navigation**: `nextStep()`, `prevStep()`
- **Generation**: `generatePrompt()`, `handleFinishAndCopy()`
- **Export**: Clipboard copy, TXT export, JSON export
- **Modal Management**: `setIsModalOpen()`, `setIsCompositionExamplesOpen()`

### State Variables

| Variable | Type | Description |
|----------|------|-------------|
| `currentStep` | `number` | Current step in the wizard (1-4) |
| `formData` | `FormData` | All form inputs and selections |
| `isModalOpen` | `boolean` | Controls prompt editor modal |
| `isCompositionExamplesOpen` | `boolean` | Controls composition examples modal |
| `isNavigationWarningOpen` | `boolean` | Controls navigation warning modal |
| `editablePrompt` | `string` | Generated prompt for editing |

## Usage Examples

### Basic Implementation

```tsx
import { ImagePromptWizard } from '@/components/image-prompt-wizard'

export default function MyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ImagePromptWizard />
    </div>
  )
}
```

### With Custom Styling

```tsx
import { ImagePromptWizard } from '@/components/image-prompt-wizard'

export default function MyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          AI Image Prompt Generator
        </h1>
        <ImagePromptWizard />
      </div>
    </div>
  )
}
```

### Integration with External Systems

```tsx
import { ImagePromptWizard } from '@/components/image-prompt-wizard'

export default function MyPage() {
  const handlePromptGenerated = (prompt: string) => {
    // Send to AI image generation service
    fetch('/api/generate-image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    })
  }

  return (
    <div>
      <ImagePromptWizard />
      {/* Custom integration logic */}
    </div>
  )
}
```

## Customization

### Styling Customization

The component uses Tailwind CSS classes that can be customized:

```css
/* Custom color scheme */
.image-wizard-progress {
  @apply bg-gradient-to-r from-purple-500 to-pink-500;
}

.image-wizard-step-active {
  @apply border-purple-300 bg-purple-50;
}

.image-wizard-button-primary {
  @apply bg-purple-600 hover:bg-purple-700;
}
```

### Content Customization

Modify the step definitions and options:

```typescript
const steps = [
  {
    id: 1,
    title: "Custom Step Title",
    description: "Custom step description",
    icon: CustomIcon,
  },
  // ... more steps
]

const moodOptions = [
  { value: "custom-mood", label: "Custom Mood" },
  // ... more options
]
```

### Component Extension

Create a wrapper component for additional functionality:

```tsx
interface ExtendedImagePromptWizardProps {
  onPromptGenerated?: (prompt: string) => void
  onStepChange?: (step: number) => void
  customValidation?: (formData: FormData) => boolean
}

export function ExtendedImagePromptWizard({
  onPromptGenerated,
  onStepChange,
  customValidation
}: ExtendedImagePromptWizardProps) {
  // Add custom logic here
  return <ImagePromptWizard />
}
```

## Troubleshooting

### Common Issues

#### 1. Navigation Warnings Not Working
**Problem**: Navigation protection doesn't trigger
**Solution**: Ensure the component is mounted and formData state is properly initialized

```typescript
// Check if useEffect dependencies are correct
useEffect(() => {
  // Navigation protection logic
}, [formData]) // Ensure formData is included
```

#### 2. Export Not Working
**Problem**: Export buttons don't generate files
**Solution**: Check browser permissions and ensure proper blob creation

```typescript
// Ensure proper MIME types
const dataBlob = new Blob([textContent], { type: 'text/plain' })
```

#### 3. Modal Not Opening
**Problem**: Modals don't appear when triggered
**Solution**: Verify Modal component is properly imported and state is set

```typescript
// Check state management
const [isModalOpen, setIsModalOpen] = useState(false)
```

### Performance Optimization

#### 1. Memoization
For large forms, consider memoizing expensive operations:

```typescript
const generatePrompt = useMemo(() => {
  // Prompt generation logic
}, [formData])
```

#### 2. Debounced Updates
For real-time preview, implement debouncing:

```typescript
const debouncedUpdate = useCallback(
  debounce((value) => {
    setFormData(prev => ({ ...prev, subject: value }))
  }, 300),
  []
)
```

#### 3. Lazy Loading
For modals with images, implement lazy loading:

```typescript
const [imagesLoaded, setImagesLoaded] = useState(false)

useEffect(() => {
  // Load images when modal opens
  if (isCompositionExamplesOpen) {
    // Load composition example images
  }
}, [isCompositionExamplesOpen])
```

## Best Practices

### Prompt Engineering

1. **Be Specific**: Use detailed descriptions for subjects and objects
2. **Name People**: Avoid AI-face issues by naming individuals
3. **Use Adjectives**: Include texture and material descriptions
4. **Add Actions**: Include dynamic elements for more engaging images
5. **Group Ideas**: Use parentheses for emphasis and grouping
6. **Use Dividers**: Employ natural language dividers (–) for structure

### User Experience

1. **Progressive Disclosure**: Show only relevant information at each step
2. **Visual Feedback**: Provide clear indicators of progress and completion
3. **Contextual Help**: Include tooltips and examples for guidance
4. **Error Prevention**: Validate inputs and warn about unsaved changes
5. **Accessibility**: Ensure keyboard navigation and screen reader support

### Code Quality

1. **Type Safety**: Use TypeScript interfaces for all data structures
2. **Component Composition**: Break complex UI into smaller, reusable components
3. **State Management**: Keep state as local as possible, lift when necessary
4. **Error Handling**: Implement proper error boundaries and fallbacks
5. **Testing**: Write unit tests for critical functions and integration tests for user flows

### Performance

1. **Bundle Size**: Use dynamic imports for heavy components
2. **Rendering**: Optimize re-renders with React.memo and useMemo
3. **Images**: Optimize and lazy load images in modals
4. **State Updates**: Batch state updates to minimize re-renders
5. **Memory Management**: Clean up event listeners and timeouts

## Conclusion

The Image Prompt Wizard is a comprehensive solution for creating structured, professional-quality prompts for AI image generation. Its step-by-step approach, combined with advanced features like navigation protection, export options, and interactive examples, makes it an invaluable tool for users looking to generate high-quality AI images.

The component is built with modern React patterns, TypeScript for type safety, and Tailwind CSS for styling, making it both maintainable and extensible. Whether used as-is or customized for specific needs, it provides a solid foundation for prompt generation workflows.

For questions, issues, or contributions, please refer to the project's issue tracker or documentation repository.
