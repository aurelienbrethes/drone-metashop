import React, { ReactElement } from 'react';

export default function LoaderComponent(): ReactElement {
    return (
        <div className="w-full my-1 flex h-20  items-center bg-white rounded">
            <p className="w-4/12 h-full  data-placeholder bg-gray-200 overflow-hidden relative" />
            <div className="p-5">
                <p className="h-3 mb-2 w-32  data-placeholder bg-gray-200 overflow-hidden relative" />
                <p className="h-2 mb-1 w-full  data-placeholder bg-gray-200 overflow-hidden relative" />
                <p className="h-2 mb-1 w-full  data-placeholder bg-gray-200 overflow-hidden relative" />
                <p className="h-2 mb-1 w-full  data-placeholder bg-gray-200 overflow-hidden relative" />
            </div>
        </div>
    );
}
