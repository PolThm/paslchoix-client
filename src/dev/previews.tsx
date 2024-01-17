import { ComponentPreview, Previews } from '@react-buddy/ide-toolbox';

import App from '@/App';

import { PaletteTree } from './palette';
import HomePage from '@/pages/HomePage';

const ComponentPreviews = () => {
  return (
    <Previews palette={<PaletteTree />}>
      <ComponentPreview path="/App">
        <App />
      </ComponentPreview>
      <ComponentPreview path="/ComponentPreviews">
        <ComponentPreviews />
      </ComponentPreview>
      <ComponentPreview path="/HomePage">
        <HomePage />
      </ComponentPreview>
    </Previews>
  );
};

export default ComponentPreviews;
