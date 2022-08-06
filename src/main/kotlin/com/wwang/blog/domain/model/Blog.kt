package com.wwang.blog.domain.model

import org.hibernate.annotations.CreationTimestamp
import org.hibernate.annotations.UpdateTimestamp
import java.time.ZonedDateTime
import javax.persistence.*

@Entity
@Table(name = "blog")
class Blog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "blog_id", nullable = false)
    var id: Long? = null

    @Column(nullable = false)
    var title: String? = null

    @Column
    var content: String? = null

    @Column(nullable = false)
    @CreationTimestamp
    var createdAt = ZonedDateTime.now()

    @Column
    @UpdateTimestamp
    var updatedAt: ZonedDateTime? = null

    @ManyToMany(cascade = [CascadeType.ALL] )
    @JoinTable(
        name = "Blog_Tag",
        joinColumns = [JoinColumn(name = "blog_id")],
        inverseJoinColumns = [JoinColumn(name = "tag_id")]
    )
    var tags: MutableSet<Tag> = mutableSetOf()
}
