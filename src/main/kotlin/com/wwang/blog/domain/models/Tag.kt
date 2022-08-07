package com.wwang.blog.domain.models

import com.wwang.blog.presentation.dto.TagDTO
import org.hibernate.Hibernate
import org.hibernate.annotations.CreationTimestamp
import org.hibernate.annotations.UpdateTimestamp
import java.time.ZonedDateTime
import javax.persistence.*

@Entity
@Table(name = "tag")
data class Tag(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tag_id", nullable = false)
    var id: Long,

    @Column(nullable = false, unique = true)
    var tagName: String,

    @CreationTimestamp
    @Column(nullable = false)
    var createdAt: ZonedDateTime? = null,

    @UpdateTimestamp
    @Column
    var updatedAt: ZonedDateTime? = null,

    @ManyToMany(mappedBy = "tags")
    var blogs: MutableSet<Blog> = mutableSetOf()
) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other == null || Hibernate.getClass(this) != Hibernate.getClass(other)) return false
        other as Tag

        return id != null && id == other.id
    }

    override fun hashCode(): Int = 1756406093

    companion object {
        fun fromDto(dto: TagDTO) = Tag(
            id = dto.id,
            tagName = dto.tagName
        )

        fun toDto(tag: Tag) = TagDTO(
            id = tag.id,
            tagName = tag.tagName
        )
    }
}
