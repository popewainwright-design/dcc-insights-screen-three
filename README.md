# Insights One

A modern, interactive desktop application built for Diageo 2025 Insights platform. This application provides an immersive experience for exploring various business scenarios, consumer insights, and market trends through an interactive dashboard interface.

## Features

- **Interactive Dashboard**: Multi-screen dashboard layout with dynamic content navigation
- **Scenario Explorer**: Browse and interact with different business scenarios and insights
- **Long-form Video Content**: Support for extended video content playback
- **Screensaver Integration**: Built-in screensaver functionality for idle states
- **Touch-Optimized Interface**: Designed for touch-screen interactions
- **Responsive Design**: Fluid grid layout that adapts to different screen sizes

## Content Categories

The application includes various insight categories:

- Consumer Choice Framework
- Macro Trends
- Insiders Occasion Library
- Numerator Occasion Research
- Interactive Dashboards

## Technology Stack

- **Framework**: Electron + React
- **Build Tools**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Motion One
- **Language**: TypeScript
- **Package Manager**: npm

## Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- npm (comes with Node.js)

### Installation

1. Clone the repository:

```bash
git clone [repository-url]
cd insights-one
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run start
```

### Building for Production

To create a production build - make sure all environmental variables are in place and the package name and app naming has been updated:

```bash
npm run make
```

The built application will be available in the `dist` directory.

## Project Structure

```
insights-one/
├── src/                    # Source code
│   ├── components/         # Reusable React components
│   ├── screens/           # Main application screens
│   ├── lib/               # Utilities and constants
│   └── assets/            # Application assets
├── public/                # Static assets
│   ├── assets/
│   │   ├── fonts/        # Custom fonts
│   │   ├── icons/        # Application icons
│   │   ├── images/       # Content images
│   │   └── videos/       # Video content
└── [configuration files]  # Various config files
```

## Features in Detail

### Dashboard

- Multi-screen layout with smooth transitions
- Interactive tiles for different content categories
- Loading animations and transitions between sections

### Scenario Navigation

- Intuitive navigation between different business scenarios
- Progress tracking and state management
- Custom animations for transitions

### Content Display

- Support for various content types (images, videos, text)
- Responsive layout adapting to content type
- Touch-optimized interactions

## Development

### Key Commands

- `npm run start` - Start development server
- `npm run make` - Create production build
- `npm run preview` - Preview production build locally

### Configuration Files

- `vite.*.config.ts` - Vite configuration for different build targets
- `tailwind.config.js` - Tailwind CSS configuration
- `forge.config.ts` - Electron Forge configuration
- `tsconfig.json` - TypeScript configuration

## License

[License Information]

## Support

[Support Information]

## Multiscreen Dashboard

Set the `multiscreen` prop to `true` in the `Dashboard` component to enable the multiscreen dashboard.

```tsx
const multiscreen = true;
```

Then use the `DashboardMultiscreen` component to wrap the dashboard.

```tsx
<DashboardMultiscreen>
  <div className={`dashboard-single-screen${gridClass} w-screen`}>
    {data.map((item, index) => (
      <DashboardLink
        key={index}
        data={item as DashboardLinkProps}
        onLinkClick={(linkData) => handleLinkClick(linkData, index)}
        index={index}
        currentScenario={currentScenario}
      />
    ))}
  </div>
  <div className={`dashboard-single-screen${gridClass} w-screen`}>
    {data2.map((item, index) => (
      <DashboardLink
        key={index}
        data={item as DashboardLinkProps}
        onLinkClick={(linkData) => handleLinkClick(linkData, index)}
        index={index}
        currentScenario={currentScenario}
      />
    ))}
  </div>
</DashboardMultiscreen>
```
