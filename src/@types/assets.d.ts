declare module "*.svg" {
  import { ReactElement, SVGProps } from "react";
  const content: (props: SVGProps<SVGElement>) => ReactElement;
  export default content;
}

declare module "*.png" {
  const content: any;
  export default content;
}

declare module "*.webp" {
  const content: any;
  export default content;
}

declare module "*.mp4" {
  const content: any;
  export default content;
}

declare module "*.scss" {
  const content: any;
  export default content;
}
