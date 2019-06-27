import { slides as cv } from 'src/slides/cv.mdx';
import { slides as bootstrap } from 'src/slides/bootstrap.mdx';
import { distillLite } from 'src/slides/theme/index';

export const themes = [distillLite];
export const slides = [...cv, ...bootstrap]
