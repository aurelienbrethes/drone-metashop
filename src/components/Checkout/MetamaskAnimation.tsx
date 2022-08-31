import React, { useEffect } from 'react';
import ModelViewer from '@metamask/logo';
import useCheckoutFromStore from '@src/hooks/useCheckoutFromStore';

function MetamaskAnimation() {
    const { isAwaitingRequest } = useCheckoutFromStore();

    useEffect(() => {
        const viewer = ModelViewer({
            pxNotRatio: true,
            width: 300,
            height: 200,
            followMouse: false,
            slowDrift: false,
        });
        const container = document.getElementById('logo-container');
        if (container && !isAwaitingRequest) {
            container.appendChild(viewer.container);
            viewer.lookAt({
                x: 100,
                y: 100,
            });
            viewer.setFollowMouse(true);
            viewer.stopAnimation();
        }
        return () => container?.removeChild(viewer.container);
    });

    return <span id="logo-container" />;
}

export default MetamaskAnimation;
