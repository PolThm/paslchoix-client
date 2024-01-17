import {
  Category,
  Component,
  Palette,
  Variant,
} from '@react-buddy/ide-toolbox';
import MUIPalette from '@react-buddy/palette-mui';

export const ExampleLoaderComponent = () => {
  return <>Loading...</>;
};

export const PaletteTree = () => (
  <Palette>
    <Category name="App">
      <Component name="Loader">
        <Variant>
          <ExampleLoaderComponent />
        </Variant>
      </Component>
    </Category>
    <MUIPalette />
  </Palette>
);
