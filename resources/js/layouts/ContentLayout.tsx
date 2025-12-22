import React from 'react';
import homepageStyle from '~/css/Homepage.module.css';

export default function Page({
  children,
  breadCrumb,
  title,
  customHeader,
}: {
  children: React.ReactNode;
  breadCrumb?: React.ReactNode;
  title?: React.ReactNode;
  customHeader?: React.ReactNode;
}) {
  return (
    <div className="pb-12 pt-2">
      <div className="">
        {breadCrumb}
        {customHeader
          ? customHeader
          : title && (
              <div className={homepageStyle.header}>
                <h2 className="text-4xl font-bold color-mantine-blue-8 mb-4 mx-auto text-center">{title}</h2>
              </div>
            )}
        <div className="px-6 mx-auto">{children}</div>
      </div>
    </div>
  );
}
