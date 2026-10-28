import { useState } from 'react';
import { Check, ChevronDown, Globe } from 'lucide-react';
import './language-selector.css';

export type AppLanguage = 'pt' | 'en' | 'fr' | 'es';

const options: { code: AppLanguage; locale: string; name: string; flag: string }[] = [
  { code: 'pt', locale: 'pt-BR', name: 'Português', flag: '🇧🇷' },
  { code: 'fr', locale: 'fr-FR', name: 'Français', flag: '🇫🇷' },
  { code: 'en', locale: 'en-US', name: 'English', flag: '🇺🇸' },
  { code: 'es', locale: 'es-ES', name: 'Español', flag: '🇪🇸' },
];

export function LanguageSelector({ language, onChange, label = 'Idioma' }: { language: AppLanguage; onChange: (language: AppLanguage) => void; label?: string }) {
  const [open, setOpen] = useState(false);
  const selected = options.find(option => option.code === language) ?? options[0];

  return <div className="language-picker">
    <button
      type="button"
      className="language-picker-trigger"
      aria-label={`${label}: ${selected.name}`}
      aria-haspopup="listbox"
      aria-expanded={open}
      onClick={() => setOpen(value => !value)}
      onKeyDown={event => { if (event.key === 'Escape') setOpen(false); }}
    >
      <Globe size={16} aria-hidden="true" />
      <span className="language-picker-flag" aria-hidden="true">{selected.flag}</span>
      <span className="language-picker-name">{selected.name}</span>
      <ChevronDown size={14} className={open ? 'language-picker-chevron is-open' : 'language-picker-chevron'} aria-hidden="true" />
    </button>
    {open && <>
      <button type="button" className="language-picker-dismiss" aria-label="Fechar seleção de idioma" onClick={() => setOpen(false)} />
      <div className="language-picker-menu" role="listbox" aria-label={label}>
        <span className="language-picker-heading">{label}</span>
        {options.map(option => <button
          type="button"
          role="option"
          aria-selected={language === option.code}
          className={language === option.code ? 'language-picker-option selected' : 'language-picker-option'}
          key={option.code}
          onClick={() => { onChange(option.code); setOpen(false); }}
        >
          <span className="language-picker-option-flag" aria-hidden="true">{option.flag}</span>
          <span className="language-picker-copy"><b>{option.name}</b><small>{option.locale}</small></span>
          {language === option.code && <Check size={16} aria-hidden="true" />}
        </button>)}
      </div>
    </>}
  </div>;
}
