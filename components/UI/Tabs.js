import styled from 'styled-components';

const Button = styled.button`
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
const SelectedButton = styled(Button)`
  background-color: purple;
`

const Tabs = (props) => {
  const { years, selected , onChange} = props;

  const options = years.map(year => {
    if (year === selected)
      return (
        <SelectedButton value={year} key={year}>{year}</SelectedButton>
      )
    return (
      <Button value={year} key={year} onClick={() => onChange(year)}>{year}</Button>
    )
  })

  return (
    <>
      <div role="tablist">
        {options}
      </div>
    </>
  )
};

export default Tabs;