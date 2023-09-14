import * as elements from "typed-html";

export async function error({ title = 'Erreur', message = 'Une erreur est survenue', close = 'Okay' }: any) {
  return (
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{ title }</h5>
        </div>
        <div class="modal-body">
          <p>{ message }</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{ close }</button>
        </div>
      </div>
    </div>
  )
}