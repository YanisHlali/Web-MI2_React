export default function Articles({ article, deleteArticle, getUpdateArticle }) {
     return (
          <div className="componentArticle">
               <div className="article__header">
                    <h1 className="article__title">{article.author}</h1>
                    <p className="article__date">Posté le {article.date}</p>
               </div>
               <div className="article__content">
                    <p className="article__text">{article.content}</p>
               </div>
               <div className="article__footer">
                    <button value="Modifier" onClick={getUpdateArticle}>
                         Modifier
                    </button>
                    <button value="Supprimer" onClick={deleteArticle}>
                         Supprimer
                    </button>
               </div>
          </div>
     );
}
