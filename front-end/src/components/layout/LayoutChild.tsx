import styled from 'styled-components';

interface LayoutChildProps {
  halfWidth?: boolean;
  marginTop?: boolean;
}

const LayoutChild = styled.div`
  width: ${(props: LayoutChildProps) => props.halfWidth ? '50%' : '100%'};
  height: 100%;
  background-color: white;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  border-radius: 0.6rem;
  margin-top: ${(props: LayoutChildProps) => props.marginTop ? '1rem' : '0rem'};
  padding: 15px;
  display: flex;
  flex-direction: column;
`;

export default LayoutChild;
