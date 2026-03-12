"use client";

export default function CheckBoxUI() {
  return (
    <section className="container mt-3">
      <div className="d-flex gap-3">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            defaultChecked
            id="check1"
          />
          <label className="form-check-label" htmlFor="check1">
            Small
          </label>
        </div>

        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            defaultChecked
            id="check2"
          />
          <label className="form-check-label" htmlFor="check2">
            Large
          </label>
        </div>
      </div>
    </section>
  );
}
