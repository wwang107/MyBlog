/**
 * CREATE Script for init of DB
 */

insert into blog (blog_id, title, content, created_at)
values (1, 'title1', 'content1', now());
insert into blog (blog_id, title, content, created_at)
values (2, 'title2', 'content2', now());

insert into tag (tag_id, tag_name, created_at)
values (1, 'tag1', now());
insert into tag (tag_id, tag_name, created_at)
values (2, 'tag2', now());
