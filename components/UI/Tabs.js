import Link from 'next/link';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 2rem 0;
`;

const Year = styled.span`
  font-size: 1.5em;
  padding: 1rem;
  background-color: grey;
  color: white;
  border: none;
  cursor: pointer;
  &:first-child {
    border-top-left-radius: .5rem;
    border-bottom-left-radius: .5rem;
  }
  &:last-child {
    border-top-right-radius: .5rem;
    border-bottom-right-radius: .5rem;
  }
`;
const SelectedYear = styled(Year)`
  background-color: purple;
`

const Tabs = (props) => {
  const { years, selected} = props;

  const options = years.map(year => {
    const href = `/games/${year}`;
    if (year.toString() === selected)
      return (
        <SelectedYear key={year}><Link href={href}>{year}</Link></SelectedYear>
      )
    return (
      <Year key={year}><Link href={href}>{year}</Link></Year>
    )
  })

  return (
    <>
      <Wrapper role="tablist">
        {options}
      </Wrapper>
    </>
  )
};

export default Tabs;