import type { HTMLAttributes, ReactNode } from "react";
import "../../styles/card.css";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  title?: string;
  description?: string;
  headerAction?: ReactNode;
  footer?: ReactNode;
  interactive?: boolean;
};

export default function Card({
  children,
  title,
  description,
  headerAction,
  footer,
  interactive = false,
  className,
  ...props
}: CardProps) {
  const classes = ["ui-card", interactive && "ui-card--interactive", className]
    .filter(Boolean)
    .join(" ");

  const hasHeader = title || description || headerAction;

  return (
    <div className={classes} {...props}>
      {hasHeader && (
        <header className="ui-card__header">
          <div className="ui-card__heading">
            {title && <h2 className="ui-card__title">{title}</h2>}

            {description && (
              <p className="ui-card__description">{description}</p>
            )}
          </div>

          {headerAction && (
            <div className="ui-card__header-action">{headerAction}</div>
          )}
        </header>
      )}

      <div className="ui-card__content">{children}</div>

      {footer && <footer className="ui-card__footer">{footer}</footer>}
    </div>
  );
}
