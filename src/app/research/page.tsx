import { EmptyPage } from "../components/EmptyPage";
import { research } from "../content/research";

export default function Research() {
  return (
    <div>
      <h2 className="text-2xl mb-6">Research</h2>
      <div className="space-y-6">
        {research.map(({title, textBlocks})=>
        <>
            <div className="space-y-4">
              {!!title && (<h2 className="text-lg mb-6">{title}</h2>)}
              {textBlocks.map((text, index) =>
                <div key={index} className="text-slate-700 space-y-4">
                  {text}
                </div>
              )}
            </div >
        </>)}
      </div>
  </div>
  );
}
