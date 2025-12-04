import React from 'react';
import homepageStyle from '~/css/Homepage.module.css';

export default function Page({
  children,
  breadCrumb,
  title,
  customHeader,
}: {
  children: React.ReactNode;
  breadCrumb: React.ReactNode;
  title?: React.ReactNode;
  customHeader?: React.ReactNode;
}) {
  return (
    <div className="pb-12 pt-2">
      <div className="container mx-auto max-xs:px-4">
        {breadCrumb}
        {customHeader
          ? customHeader
          : title && (
              <div className={homepageStyle.header}>
                <h2 className="text-4xl font-bold text-left color-mantine-blue-8 mb-4">{title}</h2>
              </div>
            )}
        {children}
      </div>
    </div>
  );
}
