import Sequelize from 'sequelize';

//SECURITY
import UserModel from '../src/modules/auth/models/UserModel'
import RoleModel from '../src/modules/auth/models/RoleModel'
import ForumModel from '../src/modules/forum/models/ForumModel'
import PostModel from '../src/modules/forum/models/PostModel'
import TagModel from '../src/modules/forum/models/TagModel'
import FileModel from '../src/modules/forum/models/FileModel'
import CareerModel from '../src/modules/career/models/CareerModel'
import SubjectModel from '../src/modules/career/models/SubjectModel'

import {
    DBURL
} from './index'

import bcryptjs from "bcryptjs";
import { readPostsAction } from '../src/modules/forum/controllers/PostController';

const sequelize = new Sequelize(DBURL);

//AUTH
const User = UserModel(sequelize, Sequelize);
const Role = RoleModel(sequelize, Sequelize);
//FORUM
const Forum = ForumModel(sequelize, Sequelize);
const Post = PostModel(sequelize, Sequelize);
const Tag = TagModel(sequelize, Sequelize);
const File = FileModel(sequelize, Sequelize);
//CAREER
const Career = CareerModel(sequelize, Sequelize);
const Subject = SubjectModel(sequelize, Sequelize);




sequelize.sync()
    .then(async () => {
        console.log('Conexion con MySql mediante Sequelize')
        let salt = bcryptjs.genSaltSync(10);
        let hashPassword = bcryptjs.hashSync('123456', salt);
        await Career.create({
            name: 'Ingenieria en Sistemas de Información',
        });
        await Career.create({
            name: 'Ingenieria Civil',
        });
        await Career.create({
            name: 'Ingenieria Mecánica',
        });
        await Career.create({
            name: 'Materias básicas Ingenieria',
        });
        await Subject.create({
            name: 'Matematica Superior',
            year: 3,
            career_id: 1,
        });
        await Subject.create({
            name: 'Matemática Discreta',
            year: 1,
            career_id: 1,
        });
        await Subject.create({
            name: 'Análisis de Sistemas',
            year: 2,
            career_id: 1,
        });
        await Role.create({
            name: 'admin',
        });
        await Role.create({
            name: 'user',
        });

        await User.create({
            name: 'Francisco G.',
            email: 'admin@gmail.com',
            username: 'admin',
            password: hashPassword,
            points: 532,
            role_id: 1,
            active: 1,
            career_id: 1,
        });
        await Forum.create({
            name: 'Foro de Ing. en Sistemas',
            description: 'Materias relacionadas de segundo año en adelante',
            career_id: 1
        })
        await Forum.create({
            name: 'Foro de Ing. Civil',
            description: 'Materias relacionadas de segundo año en adelante',
            subject_id: 2,
            career_id: 1
        })
        await Forum.create({
            name: 'Foro de Matemática Discreta',
            description: 'Materias de primer año comunes a todas las ingenierias',
            subject_id: 2,
            career_id: 4
        })
        const primerPost = await Post.create({
            title: 'Primer Post Sistemas',
            content: 'Cosas generales de la carrera de Sistemas...',
            points: 0,
            views: 14,
            forum_id: 1,
            user_id: 1
        })
        const segPost = await Post.create({
            title: 'Final de Matemática Sup.',
            content: 'Hola! Les comparto el parcial del año pasado...',
            points: 15,
            views: 25,
            forum_id: 3,
            user_id: 1
        })
        await Tag.create({
            name: 'Parciales',
        })
        await Tag.create({
            name: 'Temas generales',
        })
        await Tag.create({
            name: 'Ayuda',
        })
        await Tag.create({
            name: 'Final',
        })
        await primerPost.addTags(2)
        await primerPost.addTags(3)
        await segPost.addTags(1)
        await segPost.addTags(3)
        await segPost.addTags(4)

        await File.create({
            name: 'Imagen de prueba internet (jpg)',
            file_url: 'https://i.pinimg.com/170x/5b/88/9e/5b889e894cf13ac90a953a86fe8afddf.jpg',
            post_id: 1
        })
        /* await Comment.create({
            text: 'Tremendo post papa, buenísimo',
            likes: 0,
            dislikes: 0,
            post_id: 2,
            user_id: 1,
        }) */
    })

export default sequelize