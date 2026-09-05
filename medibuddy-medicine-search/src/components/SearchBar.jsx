function SearchBar({ value, onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="medicine-search">Search medicines</label>
      <input
        id="medicine-search"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search by medicine name"
      />
      <button type="submit">Search</button>
    </form>
  )
}

export default SearchBar
