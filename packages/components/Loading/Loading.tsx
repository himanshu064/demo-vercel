import React from "react";
import styled from 'styled-components'


const Loading = ({ className }: { className?: string }) => (
    <Svg
      className={className}
      version="1.1"
      id="L4"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 52 100"
      enableBackground="new 0 0 0 0"
      xmlSpace="preserve"
    >
      <circle fill="currentColor" stroke="none" cx="6" cy="50" r="6">
        <animate
          attributeName="opacity"
          dur="1s"
          values="0;1;0"
          repeatCount="indefinite"
          begin="0.1"
        />
      </circle>
      <circle fill="currentColor" stroke="none" cx="26" cy="50" r="6">
        <animate
          attributeName="opacity"
          dur="1s"
          values="0;1;0"
          repeatCount="indefinite"
          begin="0.2"
        />
      </circle>
      <circle fill="currentColor" stroke="none" cx="46" cy="50" r="6">
        <animate
          attributeName="opacity"
          dur="1s"
          values="0;1;0"
          repeatCount="indefinite"
          begin="0.3"
        />
      </circle>
    </Svg>
  );

  const Svg = styled.svg`
    width: 28px;
    height: auto;
  `

  export const ButtonLoading = () => <Loading className="mx-auto w-54 h-30" />;
  export default Loading;