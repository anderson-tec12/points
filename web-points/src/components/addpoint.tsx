export function AddPoint({ outerView }: {
  outerView(): void
}) {
  return (
    <div className='add-points'>
      <button type="button" onClick={() => outerView()}>Adicionar</button>
    </div>
  )
}