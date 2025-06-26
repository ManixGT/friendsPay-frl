import React, { forwardRef } from "react";

const PageWrapper = forwardRef(({ children }, ref) => (
  <div ref={ref}>{children}</div>
));

export default PageWrapper;
