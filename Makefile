SRC	=	src/main.c

OBJ	=	$(SRC:.c=.o)

NAME	=	mysh

CC	=	gcc

all:	$(NAME)

$(NAME):	$(OBJ)
	$(CC) -o $(NAME) $(OBJ)

clean:
	$(RM) $(OBJ)

fclean:	clean
	$(RM) $(NAME);

re:	fclean all

.PHONY:	all clean fclean re
