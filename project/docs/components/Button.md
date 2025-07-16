# Button Component

A versatile, accessible button component with multiple variants and states.

---

## Table of Contents
- [Overview](#overview)
- [Props/Parameters](#propsparameters)
- [Usage Examples](#usage-examples)
- [Accessibility](#accessibility)
- [Styling & Theming](#styling--theming)
- [Edge Cases & Error Handling](#edge-cases--error-handling)
- [Performance Considerations](#performance-considerations)
- [Testing](#testing)
- [Dependencies](#dependencies)

---

## Overview

### Purpose
The Button component provides a consistent, accessible way to trigger actions throughout the application. It supports multiple visual variants, sizes, and states while maintaining semantic meaning and keyboard accessibility.

### Key Features
- Multiple visual variants (primary, secondary, danger, ghost)
- Different sizes (small, medium, large)
- Loading and disabled states
- Icon support (leading and trailing)
- Full keyboard and screen reader accessibility
- Customizable styling via props and CSS classes

### Design Principles
- **Accessibility-first**: WCAG 2.1 AA compliant
- **Consistent**: Uniform behavior across the application
- **Flexible**: Adaptable to different use cases
- **Performance-optimized**: Minimal re-renders and bundle impact

---

## Props/Parameters

### Required Props
| Prop | Type | Description | Example |
|------|------|-------------|---------|
| `children` | `ReactNode` | Button content (text, icons, etc.) | `"Click me"` |

### Optional Props
| Prop | Type | Default | Description | Example |
|------|------|---------|-------------|---------|
| `variant` | `'primary' \| 'secondary' \| 'danger' \| 'ghost'` | `'primary'` | Visual style variant | `'secondary'` |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Button size | `'large'` |
| `disabled` | `boolean` | `false` | Disables the button | `true` |
| `loading` | `boolean` | `false` | Shows loading spinner | `true` |
| `fullWidth` | `boolean` | `false` | Makes button full width | `true` |
| `leftIcon` | `ReactNode` | `undefined` | Icon before text | `<ChevronLeft />` |
| `rightIcon` | `ReactNode` | `undefined` | Icon after text | `<ChevronRight />` |
| `className` | `string` | `''` | Additional CSS classes | `'custom-button'` |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | HTML button type | `'submit'` |

### Event Handlers
| Handler | Type | Description | Parameters |
|---------|------|-------------|------------|
| `onClick` | `function` | Called when button is clicked | `(event: MouseEvent) => void` |
| `onFocus` | `function` | Called when button receives focus | `(event: FocusEvent) => void` |
| `onBlur` | `function` | Called when button loses focus | `(event: FocusEvent) => void` |

### Prop Validation
```typescript
interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  onFocus?: (event: FocusEvent<HTMLButtonElement>) => void;
  onBlur?: (event: FocusEvent<HTMLButtonElement>) => void;
}
```

---

## Usage Examples

### Basic Usage
```tsx
import { Button } from './components/Button';

function App() {
  return (
    <Button onClick={() => console.log('Clicked!')}>
      Click me
    </Button>
  );
}
```

### Different Variants
```tsx
import { Button } from './components/Button';

function ButtonShowcase() {
  return (
    <div className="space-x-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="danger">Delete</Button>
      <Button variant="ghost">Cancel</Button>
    </div>
  );
}
```

### With Icons
```tsx
import { Button } from './components/Button';
import { Plus, Download, ChevronRight } from 'lucide-react';

function IconButtons() {
  return (
    <div className="space-x-4">
      <Button leftIcon={<Plus />}>
        Add Item
      </Button>
      
      <Button rightIcon={<Download />}>
        Download
      </Button>
      
      <Button 
        variant="secondary" 
        rightIcon={<ChevronRight />}
      >
        Next Step
      </Button>
    </div>
  );
}
```

### Loading State
```tsx
import { Button } from './components/Button';
import { useState } from 'react';

function AsyncButton() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await submitForm();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button 
      loading={loading} 
      onClick={handleSubmit}
      disabled={loading}
    >
      {loading ? 'Submitting...' : 'Submit Form'}
    </Button>
  );
}
```

### Form Integration
```tsx
import { Button } from './components/Button';

function LoginForm() {
  return (
    <form onSubmit={handleSubmit}>
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      
      <div className="flex space-x-4">
        <Button type="submit" variant="primary">
          Sign In
        </Button>
        <Button type="button" variant="ghost">
          Cancel
        </Button>
      </div>
    </form>
  );
}
```

---

## Accessibility

### ARIA Support
- `aria-label`: Provides accessible name when text is not descriptive
- `aria-describedby`: Links to additional description if needed
- `aria-pressed`: For toggle buttons (when applicable)
- `aria-expanded`: For dropdown trigger buttons
- `aria-disabled`: Indicates disabled state to screen readers

### Keyboard Navigation
- `Tab`: Focuses the button
- `Enter`: Activates the button
- `Space`: Activates the button
- Focus indicators are clearly visible

### Screen Reader Support
- Announces button text and state
- Loading state is announced as "busy"
- Disabled state is properly communicated
- Icon-only buttons have proper labels

### Accessibility Examples
```tsx
// Icon-only button with accessible label
<Button aria-label="Close dialog">
  <X />
</Button>

// Button with description
<Button aria-describedby="save-description">
  Save Changes
</Button>
<div id="save-description" className="sr-only">
  This will save your changes permanently
</div>

// Toggle button
<Button 
  aria-pressed={isPressed}
  onClick={() => setIsPressed(!isPressed)}
>
  {isPressed ? 'Hide' : 'Show'} Details
</Button>
```

### Accessibility Checklist
- [x] Keyboard navigable
- [x] Screen reader compatible
- [x] High contrast support
- [x] Focus indicators visible
- [x] Color is not the only indicator of state
- [x] Minimum 44px touch target on mobile
- [x] Proper semantic markup

---

## Styling & Theming

### CSS Classes
```css
/* Base button styles */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: all 0.2s;
  cursor: pointer;
  border: 1px solid transparent;
}

/* Size variants */
.btn--small {
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  min-height: 2rem;
}

.btn--medium {
  padding: 0.625rem 1rem;
  font-size: 1rem;
  min-height: 2.5rem;
}

.btn--large {
  padding: 0.75rem 1.5rem;
  font-size: 1.125rem;
  min-height: 3rem;
}

/* Variant styles */
.btn--primary {
  background-color: #3b82f6;
  color: white;
}

.btn--primary:hover:not(:disabled) {
  background-color: #2563eb;
}

.btn--secondary {
  background-color: #f3f4f6;
  color: #374151;
  border-color: #d1d5db;
}

.btn--danger {
  background-color: #ef4444;
  color: white;
}

.btn--ghost {
  background-color: transparent;
  color: #6b7280;
}

/* States */
.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn--loading {
  cursor: wait;
}

.btn--full-width {
  width: 100%;
}
```

### Customization Examples
```tsx
// Custom styling via className
<Button className="shadow-lg hover:shadow-xl">
  Custom Shadow
</Button>

// Inline styles for one-off customization
<Button style={{ backgroundColor: '#8b5cf6' }}>
  Purple Button
</Button>

// CSS-in-JS with styled-components
const StyledButton = styled(Button)`
  background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
  border: 0;
  border-radius: 3px;
  box-shadow: 0 3px 5px 2px rgba(255, 105, 135, .3);
`;
```

### Responsive Behavior
- **Mobile (< 768px)**: Minimum 44px touch target, full-width option
- **Tablet (768px - 1024px)**: Standard sizing, hover states
- **Desktop (> 1024px)**: Full hover/focus interactions, smaller padding acceptable

---

## Edge Cases & Error Handling

### Error States
1. **Invalid Props**: 
   - Unknown variant defaults to 'primary'
   - Invalid size defaults to 'medium'
   - Non-function onClick is ignored

2. **Content Issues**:
   - Empty children render as invisible button (accessibility issue)
   - Very long text content wraps appropriately
   - Icon-only buttons require aria-label

3. **State Conflicts**:
   - Loading + disabled: Loading takes precedence visually
   - Multiple icons: Only leftIcon and rightIcon are supported

### Boundary Conditions
```tsx
// Empty content (should be avoided)
<Button></Button> // Renders but not accessible

// Very long text
<Button>
  This is an extremely long button text that might wrap to multiple lines
</Button>

// Conflicting states
<Button loading disabled>
  Conflicted State
</Button>

// Invalid props (handled gracefully)
<Button variant="invalid" size="wrong">
  Fallback Styling
</Button>
```

### Error Boundary Integration
```tsx
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <Button variant="danger" onClick={resetErrorBoundary}>
      Something went wrong. Try again.
    </Button>
  );
}

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Button onClick={riskyOperation}>
        Risky Action
      </Button>
    </ErrorBoundary>
  );
}
```

---

## Performance Considerations

### Optimization Techniques
```tsx
import { memo, useCallback } from 'react';

// Memoized button to prevent unnecessary re-renders
const Button = memo(({ children, onClick, ...props }) => {
  // Component implementation
});

// Memoized click handler in parent
function Parent() {
  const handleClick = useCallback(() => {
    // Handle click
  }, []);

  return <Button onClick={handleClick}>Click me</Button>;
}
```

### Bundle Size Impact
- **Component size**: ~2.5 KB (minified + gzipped)
- **Dependencies**: 
  - `react`: Peer dependency
  - `lucide-react`: ~15 KB (for icons, optional)
- **Tree-shaking**: Fully supported

### Performance Tips
- Use `React.memo` for buttons that receive frequently changing props
- Memoize click handlers with `useCallback`
- Consider virtualization for large lists of buttons
- Lazy load icon libraries if using many different icons

### Performance Monitoring
```tsx
// Performance measurement
function MeasuredButton(props) {
  useEffect(() => {
    performance.mark('button-render-start');
    return () => {
      performance.mark('button-render-end');
      performance.measure(
        'button-render',
        'button-render-start',
        'button-render-end'
      );
    };
  });

  return <Button {...props} />;
}
```

---

## Testing

### Unit Tests
```tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button Component', () => {
  test('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  test('handles click events', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    
    render(<Button onClick={handleClick}>Click me</Button>);
    
    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('shows loading state', () => {
    render(<Button loading>Loading</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
  });

  test('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  test('applies correct variant classes', () => {
    render(<Button variant="danger">Delete</Button>);
    expect(screen.getByRole('button')).toHaveClass('btn--danger');
  });

  test('supports keyboard navigation', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();
    
    render(<Button onClick={handleClick}>Press me</Button>);
    
    const button = screen.getByRole('button');
    button.focus();
    
    await user.keyboard('{Enter}');
    expect(handleClick).toHaveBeenCalledTimes(1);
    
    await user.keyboard(' ');
    expect(handleClick).toHaveBeenCalledTimes(2);
  });

  test('renders icons correctly', () => {
    const TestIcon = () => <span data-testid="test-icon">Icon</span>;
    
    render(
      <Button leftIcon={<TestIcon />} rightIcon={<TestIcon />}>
        With Icons
      </Button>
    );
    
    expect(screen.getAllByTestId('test-icon')).toHaveLength(2);
  });
});
```

### Integration Tests
```tsx
describe('Button Integration', () => {
  test('works in form submission', async () => {
    const handleSubmit = jest.fn();
    
    render(
      <form onSubmit={handleSubmit}>
        <Button type="submit">Submit</Button>
      </form>
    );
    
    await userEvent.click(screen.getByRole('button'));
    expect(handleSubmit).toHaveBeenCalled();
  });

  test('integrates with loading states', async () => {
    function AsyncComponent() {
      const [loading, setLoading] = useState(false);
      
      const handleClick = async () => {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 100));
        setLoading(false);
      };
      
      return (
        <Button loading={loading} onClick={handleClick}>
          {loading ? 'Loading...' : 'Click me'}
        </Button>
      );
    }
    
    render(<AsyncComponent />);
    
    const button = screen.getByRole('button');
    await userEvent.click(button);
    
    expect(button).toHaveAttribute('aria-busy', 'true');
    
    await waitFor(() => {
      expect(button).not.toHaveAttribute('aria-busy');
    });
  });
});
```

### Visual Regression Tests
```tsx
// Storybook stories for visual testing
export default {
  title: 'Components/Button',
  component: Button,
};

export const AllVariants = () => (
  <div className="space-x-4">
    <Button variant="primary">Primary</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="danger">Danger</Button>
    <Button variant="ghost">Ghost</Button>
  </div>
);

export const AllSizes = () => (
  <div className="space-x-4">
    <Button size="small">Small</Button>
    <Button size="medium">Medium</Button>
    <Button size="large">Large</Button>
  </div>
);

export const States = () => (
  <div className="space-x-4">
    <Button>Normal</Button>
    <Button disabled>Disabled</Button>
    <Button loading>Loading</Button>
  </div>
);
```

---

## Dependencies

### Required Dependencies
- `react`: ^18.0.0
- `react-dom`: ^18.0.0

### Peer Dependencies
None

### Optional Dependencies
- `lucide-react`: ^0.344.0 (for icons in examples)
- `@testing-library/react`: ^13.0.0 (for testing)
- `@testing-library/user-event`: ^14.0.0 (for testing)

### Development Dependencies
- `@types/react`: ^18.0.0
- `typescript`: ^5.0.0

---

## Related Components
- [IconButton](./IconButton.md) - Button variant optimized for icon-only usage
- [LinkButton](./LinkButton.md) - Button that renders as a link
- [ButtonGroup](./ButtonGroup.md) - Container for grouping related buttons
- [LoadingSpinner](./LoadingSpinner.md) - Spinner component used in loading state

## Support
- GitHub Issues: [Create an issue](https://github.com/your-repo/issues)
- Documentation: [Component docs](https://your-docs-site.com/button)
- Storybook: [Interactive examples](https://your-storybook.com/?path=/story/button)