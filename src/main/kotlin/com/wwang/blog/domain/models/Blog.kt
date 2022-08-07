package com.wwang.blog.domain.models

import com.wwang.blog.presentation.dto.BlogCreationDTO
import com.wwang.blog.presentation.dto.BlogDTO
import com.wwang.blog.presentation.dto.TagDTO
import org.hibernate.Hibernate
import org.hibernate.annotations.CreationTimestamp
import org.hibernate.annotations.UpdateTimestamp
import java.time.ZonedDateTime
import javax.persistence.*

@Entity
@Table(name = "blog")
data class Blog(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "blog_id", nullable = false)
    var id: Long? = null,

    @Column(nullable = false)
    var title: String,

    @Column
    var content: String? = null,

    @Column(nullable = false)
    @CreationTimestamp
    var createdAt: ZonedDateTime? = null,

    @Column
    @UpdateTimestamp
    var updatedAt: ZonedDateTime? = null,

    @ManyToMany(cascade = [CascadeType.ALL])
    @JoinTable(
        name = "Blog_Tag",
        joinColumns = [JoinColumn(name = "blog_id")],
        inverseJoinColumns = [JoinColumn(name = "tag_id")]
    )
    var tags: MutableSet<Tag> = mutableSetOf()
) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other == null || Hibernate.getClass(this) != Hibernate.getClass(other)) return false
        other as Blog

        return id != null && id == other.id
    }

    override fun hashCode(): Int = 1756406093

    companion object {

        fun fromDto(dto: BlogDTO) = Blog(
            id = dto.id,
            title = dto.title,
            content = dto.content,
            tags = dto.tags.map { Tag(it.id, it.tagName) }.toMutableSet()
        )

        fun toDto(blog: Blog) = BlogDTO(
            id = blog.id!!,
            title = blog.title,
            content = blog.content,
            createdAt = blog.createdAt,
            updatedAt = blog.updatedAt,
            tags = blog.tags.map { TagDTO(it.id, it.tagName) }.toSet()
        )
    }
}
