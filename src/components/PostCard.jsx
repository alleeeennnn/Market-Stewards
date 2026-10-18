import { useState } from 'react'
import { Bookmark, Heart, Pin } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Avatar } from './Primitives'
import { timeAgo } from '../data/community'

/** Community feed post. Like/save are local UI state in this build. */
export function PostCard({ post, showPin = true }) {
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)
  const likeCount = post.likes + (liked ? 1 : 0)

  const handleLike = () => {
    setLiked((current) => !current)
  }

  const handleSave = () => {
    setSaved((current) => !current)
  }

  return (
    <article className="post">
      <header className="post__head">
        <Avatar name={post.author.name} initials={post.author.initials} tone={post.author.tone} />

        <div className="post__author">
          <span className="post__name">
            {post.author.name}
            {post.pinned && showPin ? (
              <Pin size={12} className="muted" aria-label="Pinned post" role="img" />
            ) : null}
          </span>
          <span className="post__meta">
            <span>{post.author.handle}</span>
            <span className="dot-sep" aria-hidden="true">
              ·
            </span>
            <span>{post.author.role}</span>
            <span className="dot-sep" aria-hidden="true">
              ·
            </span>
            <time dateTime={post.timestamp}>{timeAgo(post.timestamp)}</time>
          </span>
        </div>
      </header>

      <div className="stack">
        <h3 className="post__title">{post.title}</h3>
        <p className="post__body">{post.body}</p>
        {post.tags?.length ? (
          <div className="cluster cluster--tight">
            {post.tags.map((tag) => (
              <span key={tag} className="badge badge--outline">
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </div>

      <footer className="post__actions">
        <button
          type="button"
          className={`post-action ${liked ? 'is-active' : ''}`.trim()}
          aria-pressed={liked}
          onClick={handleLike}
        >
          <Heart size={15} fill={liked ? 'currentColor' : 'none'} aria-hidden="true" />
          <span className="post-action__count">{likeCount}</span>
          <span className="visually-hidden">likes</span>
        </button>

        <button
          type="button"
          className={`post-action ${saved ? 'is-active' : ''} ${saved ? 'push' : ''}`.trim()}
          aria-pressed={saved}
          onClick={handleSave}
        >
          <Bookmark size={15} fill={saved ? 'currentColor' : 'none'} aria-hidden="true" />
          {saved ? 'Saved' : 'Save'}
        </button>
      </footer>
    </article>
  )
}

/** Compact post summary used in the dashboard sidebar and related lists. */
export function PostSummary({ post, to = '/community' }) {
  return (
    <Link to={to} className="cluster" style={{ gap: 'var(--sp-3)', alignItems: 'flex-start', padding: 'var(--sp-3) 0' }}>
      <Avatar name={post.author.name} initials={post.author.initials} tone={post.author.tone} size="sm" />
      <span className="stack" style={{ gap: '0.125rem', minWidth: 0 }}>
        <span className="small strong" style={{ lineHeight: 1.35 }}>
          {post.title}
        </span>
        <span className="xs subtle">
          {post.author.name} · {post.saves} saves
        </span>
      </span>
    </Link>
  )
}
