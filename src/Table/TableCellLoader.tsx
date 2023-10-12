import cx from "classnames";
import { FC, useEffect, useRef, useState } from "react";
import ContentLoader from "react-content-loader";
import React from 'react';

import { toolkitCx } from "../../../constants";

const {
  theme: { colors },
} = require("@tailwind-config");

const TableCellLoader: FC = () => {
  const doc = window.document.documentElement;
  const isDarkMode = doc.classList.contains("dark");
  const contentRef = useRef<HTMLTableCellElement>(null);
  const [contentWidth, setContentWidth] = useState<number | null>(null);

  useEffect(() => {
    if (contentRef.current) {
      setContentWidth(contentRef.current.offsetWidth);
    }
  }, []);

  return (
    <td
      className={cx(
        toolkitCx.layout.spacing.horizontal.md,
        toolkitCx.layout.spacing.vertical.md
      )}
    >
      <div ref={contentRef}>
        {contentWidth && (
          <ContentLoader
            backgroundColor={
              isDarkMode ? colors.gray[700] : colors.gray.DEFAULT
            }
            foregroundColor={isDarkMode ? colors.gray[600] : colors.gray[200]}
            viewBox={`0 0 ${contentWidth} 20`}
          >
            <rect x="0" y="0" rx="3" ry="3" width={contentWidth} height="20" />
          </ContentLoader>
        )}
      </div>
    </td>
  );
};

export default TableCellLoader;
