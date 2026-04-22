"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Star, MessageCircle, ThumbsUp, Edit3, Trash2, Flag } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/contexts/toast-context"
import DataService, { type Comment, type EventRating } from "@/lib/data-service"

interface EventCommentsProps {
  eventId: string
}

export function EventComments({ eventId }: EventCommentsProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [eventRating, setEventRating] = useState<EventRating | null>(null)
  const [newComment, setNewComment] = useState("")
  const [selectedRating, setSelectedRating] = useState(0)
  const [editingComment, setEditingComment] = useState<string | null>(null)
  const [editContent, setEditContent] = useState("")
  const { user, isAuthenticated } = useAuth()
  const { addToast } = useToast()

  useEffect(() => {
    loadComments()
    loadEventRating()
  }, [eventId])

  const loadComments = () => {
    const eventComments = DataService.getComments(eventId)
    setComments(eventComments)
  }

  const loadEventRating = () => {
    const rating = DataService.getEventRating(eventId)
    setEventRating(rating)
  }

  const handleSubmitComment = () => {
    if (!isAuthenticated) {
      addToast("Faça login para comentar", "info")
      return
    }

    if (!newComment.trim()) {
      addToast("Escreva um comentário", "error")
      return
    }

    if (selectedRating === 0) {
      addToast("Selecione uma avaliação", "error")
      return
    }

    const comment: Comment = {
      id: Date.now().toString(),
      eventId,
      userId: user!.id,
      userName: user!.name,
      userAvatar: user!.avatar,
      content: newComment.trim(),
      rating: selectedRating,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      likes: 0,
      isEdited: false,
      isReported: false,
      status: "active"
    }

    DataService.addComment(comment)
    
    setNewComment("")
    setSelectedRating(0)
    loadComments()
    loadEventRating()
    
    addToast("Comentário adicionado com sucesso!", "success")
  }

  const handleEditComment = (commentId: string, content: string) => {
    DataService.updateComment(commentId, { 
      content, 
      isEdited: true,
      updatedAt: new Date().toISOString()
    })
    
    setEditingComment(null)
    setEditContent("")
    loadComments()
    
    addToast("Comentário editado com sucesso!", "success")
  }

  const handleDeleteComment = (commentId: string) => {
    DataService.deleteComment(commentId)
    loadComments()
    loadEventRating()
    
    addToast("Comentário eliminado com sucesso!", "success")
  }

  const handleLikeComment = (commentId: string) => {
    const comment = comments.find(c => c.id === commentId)
    if (comment) {
      DataService.updateComment(commentId, { likes: comment.likes + 1 })
      loadComments()
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("pt-PT", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  const renderStars = (rating: number, interactive = false, onStarClick?: (star: number) => void) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type={interactive ? "button" : "button"}
            onClick={interactive && onStarClick ? () => onStarClick(star) : undefined}
            className={`${
              interactive ? "cursor-pointer hover:scale-110 transition-transform" : ""
            }`}
            disabled={!interactive}
          >
            <Star
              className={`h-4 w-4 ${
                star <= rating
                  ? "text-yellow-400 fill-current"
                  : "text-primary/30"
              }`}
            />
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Rating Overview */}
      {eventRating && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-400" />
              <span>Avaliações do Evento</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Overall Rating */}
              <div className="text-center">
                <div className="text-3xl font-bold text-foreground">
                  {eventRating.averageRating.toFixed(1)}
                </div>
                <div className="text-sm text-primary/60">
                  {eventRating.totalRatings} avaliação{eventRating.totalRatings !== 1 ? "es" : ""}
                </div>
                <div className="mt-2">
                  {renderStars(Math.round(eventRating.averageRating))}
                </div>
              </div>

              {/* Rating Distribution */}
              <div className="col-span-2">
                <div className="space-y-2">
                  {Object.entries(eventRating.ratingDistribution).reverse().map(([rating, count]) => (
                    <div key={rating} className="flex items-center space-x-2">
                      <span className="text-sm text-primary/60 w-4">{rating}★</span>
                      <div className="flex-1 bg-muted rounded-full h-2">
                        <div
                          className="bg-yellow-400 h-2 rounded-full"
                          style={{
                            width: `${eventRating.totalRatings > 0 ? (count / eventRating.totalRatings) * 100 : 0}%`
                          }}
                        />
                      </div>
                      <span className="text-sm text-primary/60 w-8">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Add Comment Form */}
      {isAuthenticated && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageCircle className="h-5 w-5" />
              <span>Adicionar Comentário</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Rating Selection */}
            <div>
              <label className="block text-sm font-medium text-primary/70 mb-2">
                Avaliação *
              </label>
              <div className="flex items-center space-x-2">
                {renderStars(selectedRating, true, setSelectedRating)}
                <span className="text-sm text-primary/60 ml-2">
                  {selectedRating > 0 ? `${selectedRating} estrela${selectedRating !== 1 ? "s" : ""}` : "Selecione"}
                </span>
              </div>
            </div>

            {/* Comment Text */}
            <div>
              <label className="block text-sm font-medium text-primary/70 mb-2">
                Comentário *
              </label>
              <Textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Partilhe a sua experiência com este evento..."
                rows={3}
                maxLength={500}
              />
              <div className="text-xs text-primary/50 mt-1 text-right">
                {newComment.length}/500
              </div>
            </div>

            <Button
              onClick={handleSubmitComment}
              disabled={!newComment.trim() || selectedRating === 0}
              className="bg-primary hover:bg-accent text-white hover:text-accent-foreground"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Publicar Comentário
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Comments List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">
          Comentários ({comments.length})
        </h3>

        {comments.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <MessageCircle className="h-12 w-12 text-primary/40 mx-auto mb-4" />
              <p className="text-primary/50">Ainda não há comentários para este evento.</p>
              <p className="text-primary/40 text-sm">Seja o primeiro a partilhar a sua experiência!</p>
            </CardContent>
          </Card>
        ) : (
          comments.map((comment) => (
            <Card key={comment.id}>
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={comment.userAvatar} />
                    <AvatarFallback>
                      {comment.userName.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-foreground">
                          {comment.userName}
                        </span>
                        {comment.isEdited && (
                          <Badge variant="secondary" className="text-xs">
                            Editado
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-primary/50">
                        {formatDate(comment.createdAt)}
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="mb-2">
                      {renderStars(comment.rating)}
                    </div>

                    {/* Comment Content */}
                    {editingComment === comment.id ? (
                      <div className="space-y-2">
                        <Textarea
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                          rows={3}
                          maxLength={500}
                        />
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            onClick={() => handleEditComment(comment.id, editContent)}
                            disabled={!editContent.trim()}
                          >
                            Guardar
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setEditingComment(null)
                              setEditContent("")
                            }}
                          >
                            Cancelar
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-primary/70 mb-3">{comment.content}</p>
                    )}

                    {/* Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => handleLikeComment(comment.id)}
                          className="flex items-center space-x-1 text-sm text-primary/50 hover:text-primary transition-colors"
                        >
                          <ThumbsUp className="h-4 w-4" />
                          <span>{comment.likes}</span>
                        </button>
                      </div>

                      {/* Edit/Delete for own comments */}
                      {isAuthenticated && user?.id === comment.userId && (
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => {
                              setEditingComment(comment.id)
                              setEditContent(comment.content)
                            }}
                            className="text-sm text-primary/50 hover:text-primary transition-colors"
                          >
                            <Edit3 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteComment(comment.id)}
                            className="text-sm text-primary/50 hover:text-destructive transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      )}

                      {/* Report for other comments */}
                      {isAuthenticated && user?.id !== comment.userId && (
                        <button className="text-sm text-primary/50 hover:text-orange-600 transition-colors">
                          <Flag className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
