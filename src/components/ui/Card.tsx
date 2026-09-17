import type {ReactNode} from 'react'
type CardProps = {
    title: string;
    description: string;
    image?: string;
    children: ReactNode;
};
function Card({title, description, image, children}: CardProps) {
  return (
    <div className="card">
      {image && <img src={image} alt={title} className="card-image" />}
       <div className="card-content">
        <h2>{title}</h2>

        <p>{description}</p>

        {children && <div className="card-actions">{children}</div>}
      </div>
    </div>
  )
}

export default Card