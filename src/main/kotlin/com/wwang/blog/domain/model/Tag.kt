package com.wwang.blog.domain.model

import org.hibernate.annotations.CreationTimestamp
import org.hibernate.annotations.UpdateTimestamp
import java.time.ZonedDateTime
import javax.persistence.*

@Entity
@Table(name = "tag")
class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tag_id", nullable = false)
    var id: Long? = null

    @Column(nullable = false, unique = true)
    var tagName: String? = null

    @CreationTimestamp
    @Column(nullable = false)
    var createdAt = ZonedDateTime.now()

    @UpdateTimestamp
    @Column
    var updatedAt: ZonedDateTime? = null

    @ManyToMany(mappedBy = "tags")
    var blogs: MutableSet<Blog> = mutableSetOf()

}
